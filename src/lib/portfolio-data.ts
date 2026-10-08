// Central source of portfolio content. Replace pending entries only with verified CV facts.
export type PortfolioDocument = {
  name: string;
  filename: string;
  kind: "cv" | "certificate";
  url?: string;
  previewUrl?: string;
  verificationUrl?: string;
};

export const profile = {
  name: "Phumlani Khensani Nkuna",
  headline: "ICT · Technology · AI · Continuous Learning",
  email: "",
  telephone: "",
  location: "",
  linkedin: "",
  github: "",
};

export const completionDate = "October 6, 2026";
export const courses = [
  { name: "Introduction to AI", focus: "AI fundamentals", description: "A foundation for understanding artificial intelligence and its practical applications.", filename: "PhumlaniNkuna_IntroductiontoAI.pdf" },
  { name: "Maximize Productivity With AI Tools", focus: "AI productivity", description: "Exploring how AI tools can support everyday tasks and more productive workflows.", filename: "PhumlaniNkuna_MaximizeProductivityWithAITools.pdf" },
  { name: "Discover the Art of Prompting", focus: "Prompting", description: "Learning to communicate clearly with AI through thoughtful, structured prompts.", filename: "PhumlaniNkuna_DiscovertheArtofPrompting.pdf" },
  { name: "Use AI Responsibly", focus: "Responsible AI", description: "Developing an awareness of responsible, thoughtful and ethical AI use.", filename: "PhumlaniNkuna_UseAIResponsibly.pdf" },
  { name: "Stay Ahead of the AI Curve", focus: "AI learning and development", description: "Building a continuous-learning approach to the evolving world of AI.", filename: "PhumlaniNkuna_StayAheadoftheAICurve.pdf" },
];

export const documents: PortfolioDocument[] = [
  { name: "CV RENEW PK NKUNA", filename: "CV RENEW PK NKUNA.docx", kind: "cv" },
  { name: "Google AI Essentials", filename: "PhumlaniNkuna_GoogleAIEssentials.pdf", kind: "certificate" },
  ...courses.map(course => ({ name: course.name, filename: course.filename, kind: "certificate" as const })),
];

export const projects = [
  { title: "Professional Personal Portfolio Website", category: "Digital presence", description: "A space for a documented personal portfolio and online CV project." },
  { title: "AI Productivity & Prompt Engineering Project", category: "Artificial intelligence", description: "A space for a documented AI productivity or prompting project." },
  { title: "ICT / IT Support Project", category: "Information technology", description: "A space for a documented ICT or IT support project." },
];

export function canDownloadDocument(document: PortfolioDocument) {
  return Boolean(document.url);
}

export function contactMailto(email: string, name: string, sender: string, subject: string, message: string) {
  if (!email) return null;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${sender}`)}`;
}