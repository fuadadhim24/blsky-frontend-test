"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Message, ChatSide } from "@/types/message";

interface MessageItemProps {
    message: Message;
    side: ChatSide;
}

export function MessageItem({ message, side }: MessageItemProps) {
    const isOwn = message.sender === side;

    return (
        <div
            className={cn(
                "flex flex-col gap-1 max-w-[80%]",
                isOwn ? "ml-auto items-end" : "mr-auto items-start"
            )}
        >
            <div
                className={cn(
                    "rounded-lg px-3 py-2 text-sm break-words",
                    isOwn
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                )}
            >
                {message.content}
            </div>
            <span className="text-xs text-muted-foreground">
                {format(message.timestamp, "HH:mm")}
            </span>
        </div>
    );
}
