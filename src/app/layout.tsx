import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sins.wtf - Your Dark Link-in-Bio",
  description: "Create dark, feature-rich link-in-bio pages. All premium features for free. No paywalls. No subscriptions. Just freedom.",
  keywords: ["link in bio", "profile", "social links", "free", "dark theme"],
  openGraph: {
    title: "sins.wtf - Your Dark Link-in-Bio",
    description: "Create dark, feature-rich link-in-bio pages. All premium features for free.",
    type: "website",
    url: "https://sins.wtf",
  },
  twitter: {
    card: "summary_large_image",
    title: "sins.wtf - Your Dark Link-in-Bio",
    description: "Create dark, feature-rich link-in-bio pages. All premium features for free.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
