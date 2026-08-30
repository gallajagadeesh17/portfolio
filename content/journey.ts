export interface JourneyItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  type: string;
  description: string;
  highlights: string[];
}

export const journeyData: JourneyItem[] = [
  {
    id: "ganpat-university",
    year: "2023 — 2027",
    title: "B.Tech, Computer Engineering (Artificial Intelligence)",
    organization: "Ganpat University",
    type: "Education",
    description:
      "Pursuing undergraduate degree in Computer Engineering with specialization in Artificial Intelligence.",
    highlights: [
      "Artificial Intelligence & Machine Learning core track",
      "Hands-on programming with Python, C, and SQL",
      "Data structures, algorithms, and NLP fundamentals",
    ],
  },
  {
    id: "ai-automation-focus",
    year: "Hands-on Track",
    title: "AI Applications & LLM Workflows",
    organization: "Practical Engineering Focus",
    type: "Specialization",
    description:
      "Developing autonomous automation workflows, prompt engineering strategies, and RAG/agentic architectures.",
    highlights: [
      "Building workflows with n8n, Google Gemini, and Python",
      "Integrating human-in-the-loop review and multi-agent systems",
      "Connecting REST APIs, Bright Data, GitHub, and Google ecosystem",
    ],
  },
  {
    id: "project-milestones",
    year: "Project Building",
    title: "Practical AI & Automation Systems",
    organization: "Applied Development",
    type: "Projects",
    description:
      "Building practical applications spanning sales intelligence, content generation, repository analysis, job discovery, and ML spam classification.",
    highlights: [
      "Saarthi-AI Sales Intelligence Platform (Flask, SQLite, n8n)",
      "LinkedIn Automation AI (n8n, Gemini, Gmail Human-in-Loop)",
      "Project Archaeologist (Multi-agent GitHub analyzer)",
      "LinkedIn Job Finder & AI Spam Email Classifier",
    ],
  },
];
