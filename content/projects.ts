export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  keyPoints: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  category: string;
}

export const projectsData: Project[] = [
  {
    id: "saarthi-ai",
    number: "01",
    title: "Saarthi-AI",
    subtitle: "AI Sales Intelligence Platform",
    shortDescription:
      "An AI-powered sales intelligence platform that automates company research and generates contextual pre-meeting briefings for sales representatives.",
    keyPoints: [
      "Developed an AI-powered sales intelligence platform.",
      "Built a full-stack Flask application.",
      "Implemented secure authentication and integrated SQLite database.",
      "Created a responsive dashboard for meeting and briefing management.",
      "Integrated n8n workflows for automated company research and news collection.",
      "Generated AI-powered company insights including overviews, key products, and suggested talking points.",
    ],
    technologies: ["Flask", "SQLite", "n8n", "AI Automation"],
    image: "/images/projects/saarthi-ai.png",
    category: "AI & Full-Stack",
  },
  {
    id: "linkedin-automation-ai",
    number: "02",
    title: "LinkedIn Automation AI",
    subtitle: "Human-in-the-Loop AI Content Automation",
    shortDescription:
      "An n8n-based AI content automation workflow that converts user topics into structured LinkedIn posts using Google Gemini.",
    keyPoints: [
      "Built and iterated on an n8n-based AI content automation workflow.",
      "Used Google Gemini for intelligent content generation.",
      "Implemented human-in-the-loop Gmail approval with approve, regenerate, and reject paths.",
      "Designed a feedback-driven revision agent to refine content based on user feedback.",
      "Automatically routed approved drafts for publishing.",
    ],
    technologies: ["n8n", "Google Gemini", "Gmail API", "AI Agents", "LLM Workflows"],
    image: "/images/projects/linkedin-automation.png",
    category: "AI Workflow",
  },
  {
    id: "project-archaeologist",
    number: "03",
    title: "Project Archaeologist",
    subtitle: "Multi-Agent GitHub Revival Analyzer",
    shortDescription:
      "A multi-agent n8n workflow that analyzes public GitHub repositories and reconstructs project history, architecture signals, documentation quality, and incomplete features.",
    keyPoints: [
      "Built a multi-agent n8n workflow using specialized AI agents.",
      "Analyzed project history, code health, documentation quality, and detected incomplete features.",
      "Generated revival planning insights.",
      "Integrated GitHub APIs to collect repository metadata, commits, issues, file paths, and README content as structured evidence.",
    ],
    technologies: ["n8n", "AI Agents", "GitHub API", "LLM Workflows", "Automation"],
    image: "/images/projects/project-archaeologist.png",
    category: "Multi-Agent Systems",
  },
  {
    id: "linkedin-job-finder",
    number: "04",
    title: "LinkedIn Job Finder Automation",
    subtitle: "Automated Job Sourcing Pipeline",
    shortDescription:
      "An n8n-powered job discovery automation that converts search criteria into structured LinkedIn job leads using the Bright Data LinkedIn dataset API.",
    keyPoints: [
      "Built an n8n-powered job discovery automation.",
      "Integrated Bright Data LinkedIn dataset API.",
      "Implemented automated snapshot polling, retrieved and filtered results.",
      "Stored structured job data directly in Google Sheets.",
      "Integrated n8n Form Trigger, HTTP Request, IF, Filter, and Wait nodes for an end-to-end pipeline.",
    ],
    technologies: ["n8n", "Bright Data API", "Google Sheets API", "HTTP APIs", "Automation"],
    githubUrl: "https://github.com/gallajagadeesh17/LinkedIn-Job-Finder-Automation",
    image: "/images/projects/linkedin-job-finder.png",
    category: "Workflow Automation",
  },
  {
    id: "ai-spam-email-detection",
    number: "05",
    title: "AI Spam Email Detection System",
    subtitle: "Machine Learning Email Classifier",
    shortDescription:
      "A full-stack spam detection application using TF-IDF vectorization and Multinomial Naive Bayes for real-time email classification.",
    keyPoints: [
      "Built a full-stack spam detection application.",
      "Used TF-IDF vectorization and Multinomial Naive Bayes algorithm.",
      "Implemented real-time email classification.",
      "Developed an admin dashboard with scan history and analytics.",
      "Applied text preprocessing and feature engineering.",
    ],
    technologies: ["Python", "Scikit-learn", "TF-IDF", "Multinomial Naive Bayes", "NLP"],
    image: "/images/projects/spam-detection.png",
    category: "Machine Learning",
  },
];
