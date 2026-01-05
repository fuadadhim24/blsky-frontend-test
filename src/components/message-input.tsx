"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
    onSend: (content: string) => void;
    disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
    const [content, setContent] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (content.trim() && !disabled) {
            onSend(content.trim());
            setContent("");
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
            <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={disabled}
                className="flex-1"
            />
            <Button
                type="submit"
                size="icon"
                disabled={disabled || !content.trim()}
                className="shrink-0"
            >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
            </Button>
        </form>
    );
}
