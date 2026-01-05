"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageList } from "@/components/message-list";
import { MessageInput } from "@/components/message-input";
import { cn } from "@/lib/utils";
import type { Message, ChatSide } from "@/types/message";

interface ChatWindowProps {
    side: ChatSide;
    messages: Message[];
    onSendMessage: (content: string) => void;
    isFlashing: boolean;
    isConnected: boolean;
}

export function ChatWindow({
    side,
    messages,
    onSendMessage,
    isFlashing,
    isConnected,
}: ChatWindowProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const title = side === "left" ? "Left User" : "Right User";

    return (
        <Card
            className={cn(
                "flex flex-col h-full transition-all duration-300",
                isFlashing && mounted && "flash-animation"
            )}
        >
            <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <div className="flex items-center gap-2">
                        <span
                            className={cn(
                                "h-2 w-2 rounded-full",
                                isConnected ? "bg-green-500" : "bg-red-500"
                            )}
                        />
                        <span className="text-xs text-muted-foreground">
                            {isConnected ? "Connected" : "Disconnected"}
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                <MessageList messages={messages} side={side} />
                <MessageInput onSend={onSendMessage} disabled={!isConnected} />
            </CardContent>
        </Card>
    );
}
