"use client";

import { useEffect } from "react";
import { createChat } from "@n8n/chat";

export default function ChatWidget() {
  useEffect(() => {
    let app: any = null;
    
    // Slight delay to ensure body is fully ready
    const timer = setTimeout(() => {
      app = createChat({
        webhookUrl: "https://thara-in.app.n8n.cloud/webhook/9cc9ecd9-4f0c-4d15-acd7-f4a76813a61b/chat",
        mode: "window",
        showWelcomeScreen: true,
        initialMessages: [
          "Hi there! 👋",
          "My name is Preethi. How can I assist you today?"
        ],
      });
    }, 100);
    
    return () => {
      clearTimeout(timer);
      if (app && typeof app.unmount === "function") {
         app.unmount();
      }
    };
  }, []);

  return null;
}
