export interface Message {
    id: string;
    sender: 'left' | 'right';
    content: string;
    timestamp: number;
}

export type ChatSide = 'left' | 'right';
