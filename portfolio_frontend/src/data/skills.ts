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
    group: "Other Skills",
    items: ["Python", "C", "Data Analytics","OpenCV","YOLOv5","Object-Oriented Programming (OOP)"],
  },
  {
    group: "Tools & Platforms",
    items: ["VS Code", "Jupyter Notebook", "Atlassian Jira", "Git", "GitHub"],
  },
];
