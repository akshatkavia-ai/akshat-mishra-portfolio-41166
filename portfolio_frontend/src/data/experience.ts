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
    duration: "May'24 - Jul'24",
    period: "May'24 - Jul'24",
    location: "Bengaluru",
    highlights: [
      "AI and Cloud Research Intern role based in Bengaluru."
    ],
    logo: "default-company-logo",
    description: "AI and Cloud Research Intern at Kloudstac, Bengaluru."
  },
];
