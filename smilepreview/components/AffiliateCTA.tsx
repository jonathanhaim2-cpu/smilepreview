import Link from "next/link";
import { ArrowRight, ExternalLink, ShoppingCart } from "lucide-react";

const amazonPicks = [
  {
    name: "Crest 3D Whitestrips Professional Effects",
    price: "~$40",
    url: "https://www.amazon.com/s?k=crest+3d+whitestrips+professional+effects&tag=alignersteeth-20",
  },
  {
    name: "Waterpik Aquarius Water Flosser",
    price: "~$60",
    url: "https://www.amazon.com/s?k=waterpik+aquarius+water+flosser&tag=alignersteeth-20",
  },
  {
    name: "Retainer Brite Cleaning Tablets",
    price: "~$12",
    url: "https://www.amazon.com/s?k=retainer+brite+cleaning+tablets&tag=alignersteeth-20",
  },
];

interface AffiliateCTAProps {
  heading?: string;
  subtext?: string;
}

export default function AffiliateCTA({
  heading = "Ready to Start Your Smile Journey?",
  subtext = "Compare the top clear aligner brands and find the best fit for your smile and budget.",
}: AffiliateCTAProps) {
  return (
    <div className="my-10 space-y-5">
      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-100 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{heading}</h3>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">{subtext}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/compare" className="btn-primary">
            Compare Top Brands <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/simulator" className="btn-outline">
            Try Smile Simulator Free
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Affiliate disclosure: We may earn a commission if you purchase through our links.
        </p>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="w-5 h-5 text-orange-500" />
          <h4 className="font-bold text-gray-900">Aligner Essentials on Amazon</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {amazonPicks.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="bg-white border border-orange-100 rounded-xl p-3.5 hover:border-orange-300 hover:shadow-sm transition-all group"
            >
              <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors leading-snug mb-1">{p.name}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-gray-900">{p.price}</span>
                <span className="text-xs text-orange-500 flex items-center gap-1">
                  Amazon <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">* As an Amazon Associate we earn from qualifying purchases.</p>
      </div>
    </div>
  );
}
