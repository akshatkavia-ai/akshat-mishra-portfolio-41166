//
// Certificates data source for the Certificates section.
// Ensures compatibility with the existing UI which reads `credentialUrl`.
//
// Schema: { title, issuer, date, credentialUrl }
// Dates use full month names (e.g., "July 2024").
//

export type Certificate = {
  issuer: string;
  title: string;
  date: string; // e.g., "July 2024"
  credentialUrl?: string; // Used by the Certificates section to render the button
};

export const certificates: Certificate[] = [
  {
    title: "AWS Fundamentals",
    issuer: "AWS",
    date: "July 2024",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/specialization/K237L7JN4TZC?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Ds12n",
  },
  {
    title: "Machine Learning Specialization Course",
    issuer: "Andrew Ng",
    date: "February 2024",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/specialization/V6PU99A9L7YT",
  },
  {
    title: "Data Science Fundamentals with Python and SQL",
    issuer: "IBM",
    date: "January 2024",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/specialization/H6SEFZU3MPL2",
  },
  {
    title: "Agile with Atlassian Jira Course",
    issuer: "Atlassian",
    date: "October 2023",
    credentialUrl:
      "https://coursera.org/account/accomplishments/records/TTFJ77PLJZ4E",
  },
];
