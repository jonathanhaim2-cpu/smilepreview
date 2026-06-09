import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "SmilePreview — AI Smile Simulator for Clear Aligners",
    template: "%s | SmilePreview",
  },
  description:
    "Upload your photo and see how clear aligners could transform your smile. AI-powered simulation with personalized treatment estimates.",
  keywords: ["clear aligners", "smile simulator", "invisalign", "teeth straightening", "orthodontics"],
  authors: [{ name: "SmilePreview" }],
  creator: "SmilePreview",
  metadataBase: new URL("https://smilepreview.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smilepreview.com",
    siteName: "SmilePreview",
    title: "SmilePreview — AI Smile Simulator for Clear Aligners",
    description:
      "Upload your photo and see how clear aligners could transform your smile. Free AI-powered simulation.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SmilePreview AI Smile Simulator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmilePreview — AI Smile Simulator for Clear Aligners",
    description: "See your future smile in seconds. Free AI-powered clear aligner simulation.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-white text-gray-900 flex flex-col min-h-screen font-sans">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
