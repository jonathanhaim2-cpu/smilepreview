import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AffiliateCTAProps {
  heading?: string;
  subtext?: string;
}

export default function AffiliateCTA({
  heading = "Ready to Start Your Smile Journey?",
  subtext = "Compare the top clear aligner brands and find the best fit for your smile and budget.",
}: AffiliateCTAProps) {
  return (
    <div className="my-10 bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-100 rounded-2xl p-8 text-center">
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
  );
}
