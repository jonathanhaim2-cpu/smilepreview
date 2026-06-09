"use client";

import Link from "next/link";
import { Smile, ShieldCheck, Star, Users } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

export default function AboutContent() {
  const { t } = useLang();
  const a = t.about;

  const howIcons = [
    <Users key="u" className="w-6 h-6 text-brand-blue" />,
    <Star key="s" className="w-6 h-6 text-brand-mint" />,
    <ShieldCheck key="sh" className="w-6 h-6 text-brand-blue" />,
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Smile className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{a.headerTitle}</h1>
          <p className="text-xl text-gray-600">{a.headerSub}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{a.missionTitle}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{a.missionP1}</p>
          <p className="text-gray-700 leading-relaxed mb-4">{a.missionP2}</p>
          <p className="text-gray-700 leading-relaxed">{a.missionP3}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{a.howTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {a.howItems.map((item, i) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-5">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm border border-gray-100">
                  {howIcons[i]}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{a.editorialTitle}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{a.editorialP1}</p>
          <p className="text-gray-700 leading-relaxed mb-4">{a.editorialP2}</p>
          <p className="text-gray-700 leading-relaxed">{a.editorialP3}</p>
        </section>

        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{a.disclaimerTitle}</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">{a.disclaimerP1}</p>
          <p className="text-gray-700 text-sm leading-relaxed">{a.disclaimerP2}</p>
          <Link href="/disclaimer" className="inline-block mt-3 text-sm text-brand-blue font-medium hover:underline">
            {a.disclaimerLink}
          </Link>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{a.contactTitle}</h2>
          <p className="text-gray-700 mb-2">{a.contactP1}</p>
          <p className="text-gray-700">
            {a.contactP2}{" "}
            <a href="mailto:hello@smilepreview.com" className="text-brand-blue hover:underline">hello@smilepreview.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
