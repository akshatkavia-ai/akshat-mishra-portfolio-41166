export type Project = {
  title: string;
  description: string;
  tags: string[];
  links?: {
    demo?: string;
    github?: string;
  };
};

export const projects: Project[] = [
  {
    title: "AI Code Assistant",
    description:
      "An AI-powered coding companion that suggests completions and refactors using LLMs.",
    tags: ["LLM", "TypeScript", "Next.js", "LangChain"],
    links: {
      demo: "#",
      github: "https://github.com/example/ai-code-assistant",
    },
  },
  {
    title: "Cloud Cost Optimizer",
    description:
      "Analyzes workloads and recommends autoscaling and right-sizing across AWS/GCP.",
    tags: ["AWS", "GCP", "Node.js", "Terraform"],
    links: {
      demo: "#",
      github: "https://github.com/example/cloud-optimizer",
    },
  },
  {
    title: "Realtime Collaboration Board",
    description:
      "A collaborative whiteboard with presence and low-latency updates.",
    tags: ["WebSockets", "React", "Redis", "Tailwind"],
    links: {
      demo: "#",
      github: "https://github.com/example/realtime-board",
    },
  },
];
