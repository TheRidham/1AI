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

export type AIResponse =
  | {
      kind: "solution";
      solution: AISolution;
    }
  | {
      kind: "answer";
      answer: string;
    };

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
  answer?: string;
  kind?: AIResponse["kind"];
  timestamp: Date;
}

export interface Expert {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  bio: string;
  domains: string[];
  skills: string[];
  experience: string;
  hourlyRate: number;
  rating: number;
  reviews: number;
  available: boolean;
  responseTime: string;
  completedProjects: number;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  createdAt?: Date | string;
}