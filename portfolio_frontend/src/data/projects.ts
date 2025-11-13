export type Project = {
  title: string;
  role?: string;
  description: string;
  tags: string[];
  links?: {
    demo?: string;
    github?: string;
  };
};

export const projects: Project[] = [
  {
    title: "Shopnest",
    role: "Contributor",
    description:
      "Shopnest is my creation, an adaptable and scalable e-commerce solution built for small to medium-sized enterprises. It offers personalized online stores, streamlined product handling, and safe payment options, all powered by Flutter, Node.js, and MongoDB.",
    tags: ["Flutter", "Node.js", "MongoDB", "E-commerce", "Payment Integration"],
  },
  {
    title: "Helmet and Pothole Detection",
    role: "Contributor",
    description:
      "Developed a real-time computer vision system using Python, OpenCV, and YOLOv5 to detect helmetless riders and potholes. Optimized inference for edge devices and integrated results with a cloud dashboard for smart city monitoring.",
    tags: ["Python", "OpenCV", "YOLOv5"],
  },
  {
    title: "GitNavi",
    role: "Developer",
    description:
      "Developed GitNavi, a command-line tool to enhance Git repository navigation. Features interactive exploration of repository structures, visualization of commit histories, and streamlined access to Git operations.",
    tags: ["Git", "Command-Line Interface", "Repository Management"],
  },
  {
    title: "PawGuard",
    role: "Contributor",
    description:
      "Contributed to PawGuard, a mobile app for animal rescue, implementing real-time emergency reporting, GPS tracking, and veterinary connectivity. Utilized Flutter, Firebase, Node.js, and Google Maps API.",
    tags: ["Flutter", "Firebase", "Node.js", "Google Maps API", "Mobile Development"],
  },
];
