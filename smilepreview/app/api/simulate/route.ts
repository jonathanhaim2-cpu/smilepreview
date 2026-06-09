import { NextRequest, NextResponse } from "next/server";
import { analyzeSmilePhoto } from "@/lib/claude";
import { generateSmileSimulation } from "@/lib/replicate";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "Image must be under 20MB" }, { status: 400 });
    }

    const lang = (formData.get("lang") as string | null) ?? "en";
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    // Step 1: Run Claude analysis first so we can pass findings to Replicate
    const analysis = await analyzeSmilePhoto(base64, file.type, lang);

    // Step 2: Generate image simulation informed by Claude's findings
    const simulatedImageUrl = await generateSmileSimulation(
      base64,
      file.type,
      analysis.issuesFound
    );

    return NextResponse.json({ analysis, simulatedImageUrl });
  } catch (error) {
    console.error("Simulate API error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
