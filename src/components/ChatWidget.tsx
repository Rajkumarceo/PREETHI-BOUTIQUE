"use client";

import { useEffect, useRef } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";

export default function ChatWidget() {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let app: any = null;
    if (chatContainerRef.current) {
      app = createChat({
        webhookUrl: "https://thara-in.app.n8n.cloud/webhook/9cc9ecd9-4f0c-4d15-acd7-f4a76813a61b/chat",
        target: chatContainerRef.current,
        mode: "window",
        showWelcomeScreen: true,
        initialMessages: [
          "Hi there! 👋",
          "My name is Preethi. How can I assist you today?"
        ],
      });
    }
    
    return () => {
      if (app && typeof app.unmount === "function") {
         app.unmount();
      }
    };
  }, []);

  return <div ref={chatContainerRef} id="n8n-chat-container"></div>;
}
