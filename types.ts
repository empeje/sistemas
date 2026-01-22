
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ComponentNode {
  id: string;
  label: string;
  type: 'client' | 'loadbalancer' | 'webserver' | 'api' | 'cache' | 'database' | 'messagequeue' | 'cdn' | 'storage';
  details?: string;
}

export interface Connection {
  source: string;
  target: string;
  label?: string;
}

export interface ArchitectureGraph {
  nodes: ComponentNode[];
  links: Connection[];
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  initialPrompt: string;
  tags: string[];
}

export interface SessionState {
  problem: Problem | null;
  history: Message[];
  architecture: ArchitectureGraph;
  isThinking: boolean;
}
