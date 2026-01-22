
import { Problem } from './types';

export const BRAND_NAME = 'Sistemas';
export const MENTOR_URL = 'https://mpj.io';
export const MENTOR_HANDLE = 'mpj.io';
export const APP_SUBTITLE = 'AI Mock Interview';
export const HERO_QUOTE = '"Mastering architecture isn\'t just about passing the interview—it\'s about earning the trust to lead the systems of tomorrow."';
export const COPYRIGHT_TEXT = `© 2017-2026 ${BRAND_NAME} • Part of the ${MENTOR_HANDLE} ecosystem`;
export const FOOTER_DESCRIPTION = 'Empowering the next generation of engineers to find work that inspires them. Always build systems that are as scrappy and resilient as Rocket Raccoon.';

// Footer Links
export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Appearances', url: 'https://mpj.io/appearances' },
    { label: 'Investments', url: 'https://mpj.io/entrepreneurship' },
    { label: 'Offers', url: 'https://mpj.io/offers' },
  ],
  community: [
    { label: 'Private Community', url: 'https://discord.com/invite/TEAJHURh2e?utm_source=sistemas.mpj.io' },
    { label: 'Lu.ma', url: 'https://lu.ma/u/mpj?utm_source=sistemas.mpj.io' },
    { label: 'Meetup', url: 'https://www.meetup.com/members/279285007/?utm_source=sistemas.mpj.io' },
  ],
} as const;

// AI Model Configuration
export const AI_CONFIG = {
  textModel: 'gemini-3-flash-preview',
  voiceModel: 'gemini-2.5-flash-native-audio-preview-12-2025',
  voiceName: 'Zephyr',
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
  },
  audioConfig: {
    inputSampleRate: 16000,
    outputSampleRate: 24000,
  },
} as const;

export const SYSTEM_DESIGN_PROBLEMS: Problem[] = [
  {
    id: 'url-shortener',
    title: 'URL Shortener (TinyURL)',
    difficulty: 'Easy',
    description: 'Design a service like TinyURL that creates short aliases for long URLs.',
    initialPrompt: "Hi! I'd like you to design a URL shortener like TinyURL. Let's start by gathering functional and non-functional requirements. What do you think are the core features we need?",
    tags: ['Distributed Systems', 'Hashing', 'Caching']
  },
  {
    id: 'whatsapp-clone',
    title: 'Messenger App (WhatsApp)',
    difficulty: 'Medium',
    description: 'Design a real-time messaging service that supports 1-on-1 and group chats.',
    initialPrompt: "Let's design a real-time messaging system like WhatsApp. How should we handle message delivery and online/offline status?",
    tags: ['WebSockets', 'NoSQL', 'Scalability']
  },
  {
    id: 'netflix-clone',
    title: 'Video Streaming (Netflix)',
    difficulty: 'Hard',
    description: 'Design a global video streaming platform that handles massive traffic and high-quality video.',
    initialPrompt: "We're designing Netflix today. How do we ensure low latency for global users and handle petabytes of video data efficiently?",
    tags: ['CDN', 'Microservices', 'Storage']
  },
  {
    id: 'rate-limiter',
    title: 'API Rate Limiter',
    difficulty: 'Medium',
    description: 'Design a robust rate limiting system to protect APIs from abuse.',
    initialPrompt: "I want you to design a distributed rate limiter for our API platform. What algorithms should we consider, and where should this sit in our architecture?",
    tags: ['Security', 'Redis', 'Algorithms']
  }
];

export const SYSTEM_INSTRUCTION = `
You are an expert System Design Interviewer at a top-tier tech company (FAANG). 
Your goal is to guide the candidate (the user) through a realistic mock interview.

Guidelines:
1. START: Acknowledge the problem and ask the user to list Functional and Non-Functional requirements.
2. FLOW: Once requirements are clear, move to API design or High-level architecture.
3. VISUALIZATION: Periodically, if the user describes a system, you MUST output a special JSON block that describes the current architecture to update the visualizer.
   The block must be formatted exactly like this:
   \`\`\`json_architecture
   {
     "nodes": [{"id": "client", "label": "User Browser", "type": "client"}, {"id": "lb", "label": "Nginx LB", "type": "loadbalancer"}],
     "links": [{"source": "client", "target": "lb", "label": "HTTPS"}]
   }
   \`\`\`
4. CRITIQUE: Provide constructive feedback. If the user misses a single point of failure or scalability issue, gently point it out and ask how they'd fix it.
5. DEEP DIVE: Pick one component (e.g., the database or cache) and ask for a detailed explanation of data modeling or consistency levels.

Supported types for nodes: 'client', 'loadbalancer', 'webserver', 'api', 'cache', 'database', 'messagequeue', 'cdn', 'storage'.
Keep your responses professional, encouraging, and focused.
`;
