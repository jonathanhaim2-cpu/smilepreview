"use client";

import Link from "next/link";
import { Smile } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  const footerLinks = {
    [f.tools]: [
      { href: "/simulator", label: f.links.simulator },
      { href: "/compare",   label: f.links.compare },
    ],
    [f.learn]: [
      { href: "/blog",                         label: f.links.blog },
      { href: "/blog/clear-aligners-cost",     label: f.links.costGuide },
      { href: "/blog/best-clear-aligners",     label: f.links.bestAligners },
      { href: "/blog/invisalign-vs-byte",      label: f.links.vsGuide },
    ],
    [f.company]: [
      { href: "/about",      label: f.links.about },
      { href: "/privacy",    label: f.links.privacy },
      { href: "/terms",      label: f.links.terms },
      { href: "/disclaimer", label: f.links.disclaimer },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <span className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                <Smile className="w-5 h-5 text-white" />
              </span>
              SmilePreview
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">{f.tagline}</p>
            <p className="text-xs text-gray-500 mt-4">{f.disclaimer}</p>
          </div>
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-semibold text-white mb-4">{group}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SmilePreview. {f.copyright}</p>
          <p className="text-center">
            <span className="font-medium text-gray-400">Affiliate Disclosure:</span> {f.disclosure}
          </p>
        </div>
      </div>
    </footer>
  );
}
