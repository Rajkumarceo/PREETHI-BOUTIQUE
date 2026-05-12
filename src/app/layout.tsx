import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Preethi Boutique | Premium Indian Wear",
  description: "Shop premium fashion.",
  icons: {
    icon: "/pb_favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans bg-white text-obsidian antialiased min-h-screen pb-[60px] md:pb-0`}>
        {children}
      </body>
    </html>
  );
}
