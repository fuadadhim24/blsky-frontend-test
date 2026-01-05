# Blsky Dual Chat

Real-time dual chat window application built with Next.js and Socket.io.

## Features

- **Dual Chat Windows**: Left and right chat windows for two-way communication
- **Real-time Messaging**: WebSocket-based instant message delivery
- **Flash Notification**: Visual flash animation when receiving new messages
- **Message Persistence**: All messages are saved to localStorage and persist across page reloads
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on both desktop and mobile devices

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Socket.io** - WebSocket implementation
- **shadcn/ui** - UI component library
- **Tailwind CSS 4** - Utility-first CSS
- **next-themes** - Dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fuadadhim24/blsky-frontend-test.git
cd blsky-frontend-test
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## How It Works

1. Open the application in your browser
2. You'll see two chat windows side by side (Left User and Right User)
3. Type a message in either window and click Send (or press Enter)
4. The message will appear in both windows instantly
5. The receiving window will flash to indicate a new message
6. Messages are automatically saved and will persist when you refresh the page

## Assumptions

Based on the test requirements, the following assumptions were made:

1. **Single Tab Usage**: Both chat windows are in the same browser tab, not separate tabs
2. **User Identity**: Users are identified as "Left User" and "Right User" without login
3. **No Authentication**: Direct access to chat without any login system
4. **Message Limit**: Maximum 100 messages stored to maintain performance
5. **WebSocket Server**: Runs alongside Next.js on the same port
6. **Dark Mode**: Follows system preference with manual toggle available

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Theme and animations
│   ├── layout.tsx       # Root layout with ThemeProvider
│   └── page.tsx         # Main page with dual windows
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── chat-window.tsx  # Single chat window
│   ├── message-input.tsx
│   ├── message-item.tsx
│   ├── message-list.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── hooks/
│   └── use-socket.ts    # WebSocket + localStorage hook
├── lib/
│   └── utils.ts         # Utility functions
└── types/
    └── message.ts       # TypeScript interfaces

server.ts                # Custom server with Socket.io
```

## Author

Created for Blsky.tech Frontend Position Test - January 2026
