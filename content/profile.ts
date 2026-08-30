export interface ProfileData {
  name: string;
  role: string;
  secondaryRoles: string[];
  heroStatement: string;
  supportingParagraph: string;
  additionalLine: string;
  location: string;
  phone: string;
  email: string;
  aboutHeader: string;
  aboutText: {
    paragraph1: string;
    paragraph2: string;
  };
  gridBlocks: Array<{
    title: string;
    description: string;
  }>;
  identityCards: Array<{
    title: string;
    subtitle: string;
  }>;
}

export const profileData: ProfileData = {
  name: "Galla Jagadeesh",
  role: "AI & Automation Developer",
  secondaryRoles: [
    "B.Tech Computer Engineering (Artificial Intelligence) Student",
    "AI Applications · LLM Workflows · Workflow Automation",
  ],
  heroStatement: "Building AI systems that work.",
  supportingParagraph:
    "B.Tech Computer Engineering (Artificial Intelligence) student with hands-on experience building AI applications, LLM workflows, and workflow automations using n8n, Python, Flask, and Google Gemini.",
  additionalLine:
    "Skilled in prompt engineering, human-in-the-loop review, API integrations, NLP, and rapid prototyping.",
  location: "Guntur, Andhra Pradesh, India",
  phone: "+91 9106390609",
  email: "jagadeesh.galla20@gmail.com",
  aboutHeader: "I build with AI, automation and curiosity.",
  aboutText: {
    paragraph1:
      "I'm a B.Tech Computer Engineering (Artificial Intelligence) student with hands-on experience building AI applications, LLM workflows, and workflow automations using n8n, Python, Flask, and Google Gemini.",
    paragraph2:
      "My work spans research automation, content generation, job discovery, and AI-powered analysis, with a focus on prompt engineering, human-in-the-loop review, API integrations, NLP, and rapid prototyping.",
  },
  gridBlocks: [
    {
      title: "AI Applications",
      description: "Building practical applications powered by AI and LLM workflows.",
    },
    {
      title: "Workflow Automation",
      description: "Designing automated workflows using n8n and connected APIs.",
    },
    {
      title: "Human-in-the-Loop",
      description: "Combining AI generation with human review and feedback.",
    },
    {
      title: "Rapid Prototyping",
      description: "Turning ideas into working systems and experiments quickly.",
    },
  ],
  identityCards: [
    {
      title: "AI APPLICATIONS",
      subtitle: "LLM Workflows & Agents",
    },
    {
      title: "LLM WORKFLOWS",
      subtitle: "Prompt Engineering & RAG",
    },
    {
      title: "N8N AUTOMATION",
      subtitle: "API Pipeline Integration",
    },
    {
      title: "RAPID PROTOTYPING",
      subtitle: "Flask & Python Systems",
    },
  ],
};
