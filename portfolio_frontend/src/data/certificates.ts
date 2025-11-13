//
// Certificates data source for the Certificates section.
// Maintains compatibility with the existing UI which reads `credentialUrl`.
// Includes `url` as an alias for clarity where provided.
//

export type Certificate = {
  issuer: string;
  title: string;
  date: string; // Month'YY format, e.g., "Jul'24"
  credentialUrl?: string; // Used by the Certificates section to render the button
  url?: string; // Alias for the credential URL (not used by UI directly, kept for clarity)
};

export const certificates: Certificate[] = [
  {
    title: "AWS Fundamentals",
    issuer: "AWS",
    date: "Jul'24",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/specialization/K237L7JN4TZC?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Ds12n",
    url:
      "https://www.coursera.org/account/accomplishments/specialization/K237L7JN4TZC?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Ds12n",
  },
  {
    title: "Machine Learning Specialization Course",
    issuer: "Andrew Ng",
    date: "Feb'24",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/specialization/V6PU99A9L7YT",
    url:
      "https://www.coursera.org/account/accomplishments/specialization/V6PU99A9L7YT",
  },
  {
    title: "Data Science Fundamentals with Python and SQL",
    issuer: "IBM",
    date: "Jan'24",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/specialization/H6SEFZU3MPL2",
    url:
      "https://www.coursera.org/account/accomplishments/specialization/H6SEFZU3MPL2",
  },
  {
    title: "Agile with Atlassian Jira Course",
    issuer: "Atlassian",
    date: "Oct'23",
  },
];
