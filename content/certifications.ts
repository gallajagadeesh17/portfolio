export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skillsVerified: string[];
  image?: string;
}

export const certificationsData: Certification[] = [
  {
    id: "oracle-genai-2025",
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    date: "2025",
    skillsVerified: [
      "Generative AI Architecture",
      "LLM Fine-tuning & RAG",
      "OCI AI Services",
    ],
    image: "/images/certificates/oracle-genai.png",
  },
  {
    id: "tata-genai-analytics-2025",
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata",
    date: "2025",
    skillsVerified: [
      "Generative AI Analytics",
      "Data Processing",
      "AI Insights Framing",
    ],
    image: "/images/certificates/tata-genai.png",
  },
  {
    id: "tcs-ion-career-edge-2025",
    title: "TCS iON Career Edge: Young Professional",
    issuer: "Tata",
    date: "2025",
    skillsVerified: [
      "Professional Skill Development",
      "Business Communication",
      "Digital Literacy",
    ],
    image: "/images/certificates/tcs-ion.png",
  },
];
