import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About SmilePreview — Our Mission & Team",
  description: "Learn about SmilePreview, our AI-powered smile simulation mission, and our commitment to helping people make informed decisions about clear aligner treatment.",
  alternates: { canonical: "https://smilepreview.com/about" },
};

export default function AboutPage() {
  return <AboutContent />;
}
