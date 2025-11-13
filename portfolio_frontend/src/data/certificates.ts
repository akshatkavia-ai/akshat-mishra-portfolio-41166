export type Certificate = {
  issuer: string;
  title: string;
  date: string;
  credentialUrl?: string;
};

export const certificates: Certificate[] = [
  {
    issuer: "Amazon Web Services",
    title: "AWS Certified Solutions Architect – Associate",
    date: "2024-05",
    credentialUrl: "#",
  },
  {
    issuer: "Google Cloud",
    title: "Associate Cloud Engineer",
    date: "2023-12",
    credentialUrl: "#",
  },
  {
    issuer: "Coursera",
    title: "Deep Learning Specialization",
    date: "2023-08",
    credentialUrl: "#",
  },
];
