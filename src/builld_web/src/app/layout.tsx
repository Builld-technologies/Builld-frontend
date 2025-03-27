import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Builld | Fast-Track Your Ideas into Reality",
  description:
    "High-quality websites and digital products, delivered in weeks — not months.",
  keywords: "web development, digital products, fast development, websites",
  themeColor: "#a0ff00",
  openGraph: {
    type: "website",
    title: "Builld | Fast-Track Your Ideas into Reality",
    description:
      "High-quality websites and digital products, delivered in weeks — not months.",
    siteName: "Builld",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Builld" />
      </head>
      <body className={`${lexend.variable} antialiased`}>{children}</body>
    </html>
  );
}
