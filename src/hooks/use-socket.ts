"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import type { Message, ChatSide } from "@/types/message";

const STORAGE_KEY = "blsky-chat-messages";
const MAX_MESSAGES = 100;

interface UseSocketOptions {
    side: ChatSide;
    onFlash: () => void;
}

interface UseSocketReturn {
    messages: Message[];
    isConnected: boolean;
    sendMessage: (content: string) => void;
}

function loadMessages(): Message[] {
    if (typeof window === "undefined") return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveMessages(messages: Message[]) {
    if (typeof window === "undefined") return;
    try {
        const toSave = messages.slice(-MAX_MESSAGES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
        console.error("Failed to save messages to localStorage");
    }
}

export function useSocket({ side, onFlash }: UseSocketOptions): UseSocketReturn {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const savedMessages = loadMessages();
        setMessages(savedMessages);

        const socket = io({
            path: "/api/socket",
            addTrailingSlash: false,
        });

        socketRef.current = socket;

        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        socket.on("message", (message: Message) => {
            setMessages((prev) => {
                const newMessages = [...prev, message];
                saveMessages(newMessages);
                return newMessages;
            });

            if (message.sender !== side) {
                onFlash();
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [side, onFlash]);

    const sendMessage = useCallback(
        (content: string) => {
            if (!socketRef.current || !content.trim()) return;

            const message: Message = {
                id: uuidv4(),
                sender: side,
                content: content.trim(),
                timestamp: Date.now(),
            };

            socketRef.current.emit("message", message);
        },
        [side]
    );

    return {
        messages,
        isConnected,
        sendMessage,
    };
}
