const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

/**
 * Uses FLUX Kontext Pro to generate a realistic teeth-straightening simulation.
 * Accepts Claude's analysis so the prompt is specific to the detected issues.
 */
export async function generateSmileSimulation(
  base64: string,
  mimeType: string,
  issuesFound: string[],
  complexity: string
): Promise<string | null> {
  if (!REPLICATE_API_TOKEN) return null;

  const dataUrl = `data:${mimeType};base64,${base64}`;

  // Build a precise prompt from Claude's actual findings
  const issuesList = issuesFound
    .filter((i) => !i.toLowerCase().includes("insufficient"))
    .join(", ");

  const prompt = issuesList
    ? `This dental photo shows: ${issuesList}. ` +
      `Fix all of these dental issues and show the result after successful orthodontic clear aligner treatment. ` +
      `Make the teeth perfectly straight, evenly spaced, and properly aligned in a natural dental arch. ` +
      `Remove all crowding, overlapping, rotation, and gaps. ` +
      `Keep the exact same person — identical lips, gums, skin tone, background, and lighting. ` +
      `Only the teeth alignment should change. Photorealistic dental photograph result.`
    : `Show this person's teeth after successful orthodontic clear aligner treatment. ` +
      `Make all teeth perfectly straight, evenly spaced, and aligned in a natural arch. ` +
      `Same person, same lips, same gums, same background. Only fix the teeth. Photorealistic.`;

  console.log("Replicate prompt:", prompt);

  const startRes = await fetch(
    "https://api.replicate.com/v1/models/black-forest-labs/flux-kontext-pro/predictions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
        Prefer: "wait=60",
      },
      body: JSON.stringify({
        input: {
          input_image: dataUrl,
          prompt,
          aspect_ratio: "match_input_image",
          output_format: "jpg",
          output_quality: 92,
          safety_tolerance: 6,
        },
      }),
    }
  );

  if (!startRes.ok) {
    console.error("Replicate start error:", await startRes.text());
    return null;
  }

  let prediction = await startRes.json();
  console.log("Replicate started:", prediction.id, prediction.status);

  // If already done (Prefer: wait=60 may return completed result)
  if (prediction.status === "succeeded" && prediction.output) {
    return extractUrl(prediction.output);
  }

  // Poll — max 90 seconds
  const deadline = Date.now() + 90_000;
  while (
    prediction.status !== "succeeded" &&
    prediction.status !== "failed" &&
    Date.now() < deadline
  ) {
    await new Promise((r) => setTimeout(r, 2500));
    const pollRes = await fetch(
      `https://api.replicate.com/v1/predictions/${prediction.id}`,
      { headers: { Authorization: `Bearer ${REPLICATE_API_TOKEN}` } }
    );
    prediction = await pollRes.json();
    console.log("Replicate poll:", prediction.status);
  }

  if (prediction.status === "succeeded" && prediction.output) {
    const url = extractUrl(prediction.output);
    console.log("Replicate success:", url);
    return url;
  }

  console.error("Replicate failed:", prediction.status, prediction.error);
  return null;
}

function extractUrl(output: unknown): string {
  if (typeof output === "string") return output;
  if (Array.isArray(output)) return output[0];
  return String(output);
}
