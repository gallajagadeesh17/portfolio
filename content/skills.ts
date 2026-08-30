export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Programming",
    skills: ["Python", "C"],
  },
  {
    title: "Web Technologies",
    skills: ["HTML", "CSS", "JavaScript", "Flask"],
  },
  {
    title: "Libraries & Data",
    skills: ["Pandas", "NumPy", "Scikit-learn"],
  },
  {
    title: "Databases",
    skills: ["SQL", "MySQL", "SQLite"],
  },
  {
    title: "AI & Automation",
    skills: [
      "n8n",
      "AI Agents",
      "Prompt Engineering",
      "AI Workflow Automation",
      "NLP",
      "Google Gemini",
      "No-Code Automation Tools",
      "LLM Workflows",
    ],
  },
  {
    title: "APIs & Integrations",
    skills: [
      "REST APIs",
      "GitHub API",
      "Bright Data API",
      "Google Sheets API",
      "Gmail API",
      "LinkedIn API",
    ],
  },
  {
    title: "Developer Tools",
    skills: ["Git", "GitHub", "Google Colab"],
  },
];

export const allSkillsFlat = skillsData.flatMap((cat) => cat.skills);
