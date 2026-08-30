export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  description: string;
  keyPoints: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "ai-applications-exp",
    role: "AI Applications",
    organization: "Hands-on Project Experience",
    period: "Ongoing",
    type: "AI Systems",
    description:
      "Hands-on experience building AI applications and AI-powered analysis systems.",
    keyPoints: [
      "Saarthi-AI sales intelligence platform for automated pre-meeting briefings",
      "AI Spam Email Detection system using TF-IDF and Multinomial Naive Bayes",
      "Prompt engineering and RAG-assisted contextual insights generation",
    ],
  },
  {
    id: "llm-workflows-exp",
    role: "LLM Workflows & Automation",
    organization: "Hands-on Project Experience",
    period: "Ongoing",
    type: "Workflow Systems",
    description:
      "Hands-on experience creating LLM workflows and automation systems using n8n, Python, and Google Gemini.",
    keyPoints: [
      "LinkedIn Automation AI workflow with Gmail human-in-the-loop approval",
      "Multi-agent Project Archaeologist workflow analyzing public GitHub repos",
      "n8n visual node flow orchestration, error handling, and condition routing",
    ],
  },
  {
    id: "api-integrations-exp",
    role: "API & Integration Work",
    organization: "Hands-on Project Experience",
    period: "Ongoing",
    type: "API Integrations",
    description:
      "Experience integrating REST APIs, GitHub API, Bright Data API, Google Sheets API, Gmail API and LinkedIn API.",
    keyPoints: [
      "Bright Data LinkedIn dataset API extraction and snapshot polling",
      "GitHub REST API integration retrieving commits, issues, file paths, and READMEs",
      "Automated syncing of structured lead data into Google Sheets",
    ],
  },
];
