import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "BoiCircle",
    template: "%s | BoiCircle",
  },
  description:
    "A Bangladesh-focused book giveaway platform for listing unused books and helping nearby readers collect them for free.",
  keywords: [
    "BoiCircle",
    "Bangladesh books",
    "book giveaway",
    "free books",
    "used books",
    "student books",
    "free books Bangladesh",
  ],
  authors: [{ name: "BoiCircle" }],
  applicationName: "BoiCircle",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "BoiCircle",
    description:
      "Give unused books a second life with readers across Bangladesh.",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BoiCircle book giveaway logo and website name",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BoiCircle",
    description:
      "List unused books and connect with Bangladeshi readers who can collect them.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${inter.className} h-full antialiased`}
    >
      <body className="h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
