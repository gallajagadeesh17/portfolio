export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "gal-saarthi-ai",
    title: "Saarthi-AI Dashboard & Briefing System",
    category: "AI & Full-Stack",
    description: "Flask application interface generating automated pre-meeting briefings for sales reps.",
    image: "/images/projects/saarthi-ai.png",
  },
  {
    id: "gal-linkedin-automation",
    title: "LinkedIn Automation AI Flow",
    category: "AI Workflow",
    description: "n8n content pipeline using Google Gemini and Gmail human-in-the-loop approval routing.",
    image: "/images/projects/linkedin-automation.png",
  },
  {
    id: "gal-project-archaeologist",
    title: "Project Archaeologist Multi-Agent Node Architecture",
    category: "Multi-Agent Systems",
    description: "Specialized AI agents analyzing GitHub commits, issues, and README signals.",
    image: "/images/projects/project-archaeologist.png",
  },
  {
    id: "gal-job-finder",
    title: "LinkedIn Job Finder Sourcing Engine",
    category: "Workflow Automation",
    description: "n8n job discovery flow leveraging Bright Data dataset API and Google Sheets sync.",
    image: "/images/projects/linkedin-job-finder.png",
  },
  {
    id: "gal-spam-email",
    title: "AI Spam Email Detection Admin Interface",
    category: "Machine Learning",
    description: "Full-stack email classifier using TF-IDF vectorization and Naive Bayes algorithm.",
    image: "/images/projects/spam-detection.png",
  },
];
