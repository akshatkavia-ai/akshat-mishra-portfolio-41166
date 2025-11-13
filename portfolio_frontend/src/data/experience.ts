export type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "TechNova",
    role: "Software Developer",
    duration: "2023 — Present",
    highlights: [
      "Built ML-driven features to automate data labeling (reduced cost by 30%).",
      "Designed scalable microservices deployed on AWS with IaC.",
      "Led performance tuning to achieve 40% faster page loads.",
    ],
  },
  {
    company: "CloudHawk",
    role: "Backend Developer Intern",
    duration: "2022 — 2023",
    highlights: [
      "Implemented event-driven processing pipeline with Kafka.",
      "Optimized Postgres queries and added caching for 5x speedup.",
      "Collaborated across teams following DevOps best practices.",
    ],
  },
];
