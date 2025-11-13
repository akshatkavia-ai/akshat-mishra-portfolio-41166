export type ExperienceItem = {
  company: string;
  role: string;
  duration: string; // kept for compatibility with existing components
  highlights: string[]; // used by the Experience component
  // Extended fields for UI completeness
  period?: string;
  location?: string;
  logo?: string;
  description?: string;
};

export const experience: ExperienceItem[] = [
  {
    company: "Kloudstac",
    role: "AI and Cloud Research Intern",
    duration: "May 2024 - July 2024",
    period: "May 2024 - July 2024",
    location: "Remote",
    highlights: [
      "Worked on Generative AI, Data Engineering, and Cloud (AWS, Azure, GCP, Databricks). Contributed to AI upskilling program development, Generative AI research, and creation of technical content, coding labs, and demos. Gained hands-on experience in LLMs, cloud integration, and modern AI acceleration workflows."
    ],
    logo: "default-company-logo",
    description: "Worked on Generative AI, Data Engineering, and Cloud (AWS, Azure, GCP, Databricks). Contributed to AI upskilling program development, Generative AI research, and creation of technical content, coding labs, and demos. Gained hands-on experience in LLMs, cloud integration, and modern AI acceleration workflows."
  },
];
