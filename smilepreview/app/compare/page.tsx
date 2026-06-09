import type { Metadata } from "next";
import CompareContent from "@/components/CompareContent";

export const metadata: Metadata = {
  title: "Compare Clear Aligner Brands 2025 — Invisalign vs Byte vs Candid",
  description:
    "Side-by-side comparison of Invisalign, Byte, Candid, and SmileDirectClub. Compare price, treatment time, doctor oversight, warranty, and patient ratings.",
  alternates: { canonical: "https://alignersteeth.com/compare" },
};

export default function ComparePage() {
  return <CompareContent />;
}
