export interface SocialLink {
  name: string;
  url: string;
  iconName: "Github" | "Linkedin" | "Mail" | "Phone" | "FileText";
  label: string;
}

export const socialLinks: Record<string, SocialLink> = {
  github: {
    name: "GitHub",
    url: "https://github.com/gallajagadeesh17",
    iconName: "Github",
    label: "github.com/gallajagadeesh17",
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://linkedin.com/in/gallajagadeesh",
    iconName: "Linkedin",
    label: "linkedin.com/in/gallajagadeesh",
  },
  email: {
    name: "Email",
    url: "mailto:jagadeesh.galla20@gmail.com",
    iconName: "Mail",
    label: "jagadeesh.galla20@gmail.com",
  },
  phone: {
    name: "Phone",
    url: "tel:+919106390609",
    iconName: "Phone",
    label: "+91 9106390609",
  },
  resume: {
    name: "Resume",
    url: "/resume.pdf",
    iconName: "FileText",
    label: "Download Resume (PDF)",
  },
};
