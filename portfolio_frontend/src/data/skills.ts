export type SkillGroup = {
  group: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    group: "Frontend Technologies",
    items: ["HTML", "CSS", "Javascript", "Tailwind CSS", "Next.js", "React.js"],
  },
  {
    group: "Backend Technologies",
    items: ["Node.js", "RESTful APIs","TypeScript"],
  },
  {
    group: "Databases",
    items: ["MongoDB", "MySQL"],
  },
  {
    group: "Others",
    items: ["GraphQL", "PostgreSQL", "Redis", "WebSockets", "Tailwind CSS"],
  },
];
