import { ExternalLink, Star, DollarSign, Clock } from "lucide-react";

interface AffiliateCardProps {
  brand: string;
  logoInitial: string;
  priceRange: string;
  treatmentTime: string;
  highlight: string;
  rating: number;
  affiliateUrl: string;
  color?: string;
}

export default function AffiliateCard({
  brand,
  logoInitial,
  priceRange,
  treatmentTime,
  highlight,
  rating,
  affiliateUrl,
  color = "#2563EB",
}: AffiliateCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ backgroundColor: color }}
        >
          {logoInitial}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{brand}</h3>
          <div className="flex items-center gap-1 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            <DollarSign className="w-3 h-3" /> Price
          </div>
          <p className="font-semibold text-gray-800 text-sm">{priceRange}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            <Clock className="w-3 h-3" /> Treatment
          </div>
          <p className="font-semibold text-gray-800 text-sm">{treatmentTime}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 bg-brand-light-mint border border-emerald-100 rounded-xl px-3 py-2">
        ✓ {highlight}
      </p>

      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center justify-center gap-2 bg-brand-blue text-white font-semibold py-3 px-5 rounded-xl hover:bg-blue-700 transition-colors text-sm mt-auto"
      >
        Get Started <ExternalLink className="w-4 h-4" />
      </a>

      <p className="text-xs text-gray-400 text-center -mt-2">
        We may earn a commission at no extra cost to you
      </p>
    </div>
  );
}
