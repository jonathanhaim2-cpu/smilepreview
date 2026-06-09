"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Smile, Globe } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { LANG_LABELS, LANG_NAMES, type Lang } from "@/lib/translations";

const LANGS: Lang[] = ["en", "es", "he", "fr"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const navLinks = [
    { href: "/simulator", label: t.nav.simulator },
    { href: "/blog",      label: t.nav.blog },
    { href: "/compare",   label: t.nav.compare },
    { href: "/about",     label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <span className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
              <Smile className="w-5 h-5 text-white" />
            </span>
            Smile<span className="text-brand-blue">Preview</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-brand-blue font-medium transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-gray-600 hover:text-brand-blue font-medium text-sm transition-colors border border-gray-200 rounded-lg px-2.5 py-1.5 hover:border-brand-blue"
              >
                <Globe className="w-3.5 h-3.5" />
                {LANG_LABELS[lang]}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[130px] z-50">
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between transition-colors ${lang === l ? "text-brand-blue font-semibold" : "text-gray-700"}`}
                    >
                      {LANG_NAMES[l]}
                      <span className="text-xs text-gray-400">{LANG_LABELS[l]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/simulator" className="btn-primary text-sm py-2 px-4">
              {t.nav.tryFree}
            </Link>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            {/* Mobile language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-gray-600 text-sm border border-gray-200 rounded-lg px-2 py-1.5"
              >
                <Globe className="w-3.5 h-3.5" />
                {LANG_LABELS[lang]}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[130px] z-50">
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${lang === l ? "text-brand-blue font-semibold" : "text-gray-700"}`}
                    >
                      {LANG_NAMES[l]}
                      <span className="text-xs text-gray-400">{LANG_LABELS[l]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="p-2 text-gray-600"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-700 hover:text-brand-blue font-medium py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/simulator"
            className="btn-primary text-sm w-full justify-center mt-2"
            onClick={() => setOpen(false)}
          >
            {t.nav.tryFree}
          </Link>
        </div>
      )}
    </header>
  );
}
