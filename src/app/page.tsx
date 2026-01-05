"use client";

import { useState, useCallback } from "react";
import { ChatWindow } from "@/components/chat-window";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSocket } from "@/hooks/use-socket";

export default function Home() {
  const [leftFlashing, setLeftFlashing] = useState(false);
  const [rightFlashing, setRightFlashing] = useState(false);

  const handleLeftFlash = useCallback(() => {
    setLeftFlashing(true);
    setTimeout(() => setLeftFlashing(false), 1000);
  }, []);

  const handleRightFlash = useCallback(() => {
    setRightFlashing(true);
    setTimeout(() => setRightFlashing(false), 1000);
  }, []);

  const leftSocket = useSocket({
    side: "left",
    onFlash: handleLeftFlash,
  });

  const rightSocket = useSocket({
    side: "right",
    onFlash: handleRightFlash,
  });

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Blsky Dual Chat</h1>
            <p className="text-muted-foreground text-sm">
              Real-time chat with WebSocket
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Chat Windows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-160px)]">
          <ChatWindow
            side="left"
            messages={leftSocket.messages}
            onSendMessage={leftSocket.sendMessage}
            isFlashing={leftFlashing}
            isConnected={leftSocket.isConnected}
          />
          <ChatWindow
            side="right"
            messages={rightSocket.messages}
            onSendMessage={rightSocket.sendMessage}
            isFlashing={rightFlashing}
            isConnected={rightSocket.isConnected}
          />
        </div>
      </div>
    </main>
  );
}
