"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageItem } from "@/components/message-item";
import type { Message, ChatSide } from "@/types/message";

interface MessageListProps {
    messages: Message[];
    side: ChatSide;
}

export function MessageList({ messages, side }: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-3">
                {messages.length === 0 ? (
                    <p className="text-center text-muted-foreground text-sm py-8">
                        No messages yet. Start the conversation!
                    </p>
                ) : (
                    messages.map((message) => (
                        <MessageItem key={message.id} message={message} side={side} />
                    ))
                )}
                <div ref={bottomRef} />
            </div>
        </ScrollArea>
    );
}
