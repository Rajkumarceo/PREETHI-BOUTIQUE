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
      <head>
        <link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
      </head>
      <body className={`${jakarta.variable} font-sans bg-white text-obsidian antialiased min-h-screen pb-[60px] md:pb-0`}>
        {children}
        
        <script type="module" dangerouslySetInnerHTML={{
          __html: `
            import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
            createChat({
              webhookUrl: 'https://thara-in.app.n8n.cloud/webhook/9cc9ecd9-4f0c-4d15-acd7-f4a76813a61b/chat',
              mode: 'window',
              showWelcomeScreen: true,
              initialMessages: [
                "Hi there! 👋",
                "My name is Preethi. How can I assist you today?"
              ]
            });
          `
        }} />
      </body>
    </html>
  );
}
