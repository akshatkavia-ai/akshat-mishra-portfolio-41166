export type Personal = {
  name: string;
  title: string;
  tagline: string;
  resumeUrl: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
};

export const personal: Personal = {
  name: "Akshat Mishra",
  title: "Software Developer",
  tagline:
    "I build intelligent, scalable solutions across AI, Cloud, and the MERN stack.",
  // TODO: Replace with your hosted resume file/link
  resumeUrl: "https://example.com/resume.pdf",
  location: "Bengaluru, India",
  social: {
    // TODO: Replace with your profiles
    github: "https://github.com/theakshatmishra",
    linkedin: "https://www.linkedin.com/in/akshat-mishra-8615a6249",
    email: "theakshatmishra0702@gmail.com",
  },
};
