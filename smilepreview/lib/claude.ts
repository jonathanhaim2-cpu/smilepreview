import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface SmileAnalysis {
  issuesFound: string[];
  complexity: "mild" | "moderate" | "severe";
  treatmentDuration: string;
  description: string;
  simulatedResult: string;
  recommendation: string;
  confidenceNote: string;
}

const LANG_INSTRUCTIONS: Record<string, string> = {
  en: "Respond with all text fields in English.",
  es: "Responde con todos los campos de texto en español.",
  he: "ענה עם כל שדות הטקסט בעברית.",
  fr: "Réponds avec tous les champs de texte en français.",
};

export async function analyzeSmilePhoto(base64Image: string, mimeType: string, lang = "en"): Promise<SmileAnalysis> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: `You are a dental AI assistant that helps people understand their orthodontic options.
Analyze uploaded photos of teeth and provide helpful, encouraging, and honest assessments.
Always remind users to consult a licensed orthodontist for professional advice.
${LANG_INSTRUCTIONS[lang] ?? LANG_INSTRUCTIONS.en}
Respond ONLY with a valid JSON object matching the schema provided. No markdown, no explanation outside JSON. JSON keys must always remain in English.`,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mimeType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
              data: base64Image,
            },
          },
          {
            type: "text",
            text: `Analyze this photo of teeth and return a JSON object with these exact fields:
{
  "issuesFound": ["array", "of", "specific issues visible"],
  "complexity": "mild" | "moderate" | "severe",
  "treatmentDuration": "e.g. 6–9 months",
  "description": "2-3 sentences describing what you observe about the alignment",
  "simulatedResult": "2-3 sentences describing what the smile could look like after clear aligner treatment",
  "recommendation": "1-2 sentences with an encouraging next step",
  "confidenceNote": "one sentence about the limitations of AI analysis vs professional evaluation"
}

If the image does not clearly show teeth, set issuesFound to ["Image quality insufficient for analysis"] and complexity to "mild", and note this in the description.`,
          },
        ],
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    return JSON.parse(jsonMatch[0]) as SmileAnalysis;
  } catch {
    return {
      issuesFound: ["Unable to parse analysis"],
      complexity: "mild",
      treatmentDuration: "Consult an orthodontist",
      description: "We were unable to fully analyze your photo. Please ensure your teeth are clearly visible.",
      simulatedResult: "A clearer photo would allow us to provide a better simulation.",
      recommendation: "We recommend scheduling a free consultation with a licensed orthodontist.",
      confidenceNote: "AI analysis has limitations and should not replace professional dental advice.",
    };
  }
}
