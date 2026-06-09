"use client";

type AdSize = "leaderboard" | "rectangle" | "skyscraper" | "inline";

interface AdSlotProps {
  size: AdSize;
  position?: string;
  className?: string;
}

const sizeMap: Record<AdSize, { width: number; height: number; label: string }> = {
  leaderboard: { width: 728, height: 90, label: "728×90 Leaderboard" },
  rectangle: { width: 336, height: 280, label: "336×280 Rectangle" },
  skyscraper: { width: 300, height: 600, label: "300×600 Skyscraper" },
  inline: { width: 300, height: 250, label: "300×250 Rectangle" },
};

const isDev = process.env.NODE_ENV === "development";

export default function AdSlot({ size, position, className = "" }: AdSlotProps) {
  const { width, height, label } = sizeMap[size];

  if (isDev) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-xs font-medium mx-auto ${className}`}
        style={{ width: Math.min(width, 728), height }}
        aria-hidden="true"
      >
        <span>Ad Slot — {label}{position ? ` (${position})` : ""}</span>
      </div>
    );
  }

  return (
    <div className={`mx-auto ${className}`} style={{ width: Math.min(width, 728) }}>
      {/* AdSense code goes here in production */}
      {/* Replace with: <ins className="adsbygoogle" ... /> */}
    </div>
  );
}
