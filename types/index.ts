export interface AISolution {
  domain: string;
  intent: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  requiredSkills: string[];
  tools: Tool[];
  workflow: WorkflowStep[];
  insights: string;
}

export interface Tool {
  name: string;
  description: string;
  useCase: string;
  pricing: string;
  category: string;
}

export interface WorkflowStep {
  phase: string;
  title: string;
  description: string;
  tasks: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  solution?: AISolution;
  timestamp: Date;
}

export interface Expert {
  id: string;
  name: string;
  avatar: string;
  title: string;
  domains: string[];
  rating: number;
  reviews: number;
  hourlyRate: string;
  experience: string;
  skills: string[];
  bio: string;
  available: boolean;
}