import type { Metadata } from "next";
import "./globals.css";

const SITE_URL =
  (process.env.NEXT_PUBLIC_FRONTEND_URL || "").replace(/\/$/, "") || undefined;

export const metadata: Metadata = {
  title: "Akshat Mishra | Software Developer",
  description:
    "Personal portfolio of Akshat Mishra — Software Developer specializing in AI, Cloud, and MERN Stack. Projects, experience, skills, and contact.",
  applicationName: "Akshat Mishra Portfolio",
  keywords: [
    "Akshat Mishra",
    "Software Developer",
    "AI",
    "Cloud",
    "MERN",
    "Portfolio",
  ],
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  alternates: {
    canonical: SITE_URL || "/",
  },
  openGraph: {
    title: "Akshat Mishra | Software Developer",
    description:
      "Explore projects, experience, and skills in AI, Cloud, and MERN Stack.",
    url: SITE_URL,
    siteName: "Akshat Mishra Portfolio",
    type: "website",
    images: [
      {
        url: `${SITE_URL || ""}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Akshat Mishra Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshat Mishra | Software Developer",
    description:
      "Explore projects, experience, and skills in AI, Cloud, and MERN Stack.",
    images: [`${SITE_URL || ""}/og-image.svg`],
    creator: "@akshat",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="bg-black text-white antialiased selection:bg-orange-500/30 selection:text-white">
        {/* Root gradient backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10"
        >
          <div className="absolute top-[-10%] left-[-10%] h-72 w-72 rounded-full bg-orange-500/20 blur-3xl animate-glow-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl animate-glow-pulse"></div>
        </div>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
