console.log("script.js loaded!");

// Hero Typing Effect
const phrases = ["AI ENGINEER", "ML DEVELOPER"];
let i = 0, j = 0, isDeleting = false;
const textDisplay = document.querySelector(".typing-text");

function typeLoop() {
  textDisplay.innerHTML = phrases[i].substring(0, j);

  if (!isDeleting && j <= phrases[i].length) {
    j++;
  } else if (isDeleting && j <= phrases[i].length) {
    j--;
  }

  if (j === phrases[i].length) {
    isDeleting = true;
    setTimeout(typeLoop, 1500); // Pause at end of word
    return;
  } else if (j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
  }
  setTimeout(typeLoop, isDeleting ? 50 : 100);
}
typeLoop();

// Fade animation on scroll
const cards = document.querySelectorAll(
  ".bento-card, .project-card, .journey-card, .skill-tag"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

cards.forEach((card) => {
  observer.observe(card);
});

// AI Chat Bot Responses
const responses = {
    "tell me about yourself":
        "I'm Jagadeesh Galla, a B.Tech CSE-AI student passionate about building AI-powered software, autonomous AI agents, and workflow automation systems. I enjoy transforming repetitive business processes into intelligent AI solutions using Python, Flask, n8n, Generative AI, and modern APIs. My focus is on developing production-ready AI applications that combine machine learning, LLMs, and automation to improve productivity and user experience.",
    "what are your technical skills":
        "My core skills include Python, Flask, Machine Learning, NLP, Scikit-learn, Pandas, NumPy, HTML, CSS, JavaScript, SQLite, REST APIs, Git, GitHub, n8n, Google Gemini AI, Prompt Engineering, AI Agents, Workflow Automation, API Integration, and more.",
    "what projects have you built":
        "I've built several AI projects, including a LinkedIn AI Automation Platform, an AI Sales Intelligence Agent, a Spam Email Detection System, and a Movie Recommendation System. My recent focus is on end-to-end AI automation.",
    "what is your ai sales intelligence agent":
        "It's an AI-powered sales assistant that automatically researches companies from news, websites, and social media to generate personalized meeting briefings. The platform helps sales teams prepare faster with AI-generated insights and workflow automation.",
    "are you looking for internships":
        "Yes! I'm actively seeking AI Engineer, Machine Learning Engineer, and Automation Developer internships. I'm always excited to collaborate on AI products, automation platforms, and innovative software solutions.",
    "show me your resume":
        "You can view my resume by clicking the Resume button in the navigation bar or by downloading it from the hero section.",
    "how can i contact you":
        "You can reach me through Email, GitHub, or LinkedIn using the contact section below.",
    "linkedin ai":
        "The LinkedIn AI Automation Platform is an end-to-end system that generates high-quality LinkedIn posts using Google Gemini AI, sends content for Gmail approval, regenerates posts from reviewer feedback, and automatically publishes approved posts to LinkedIn using n8n workflows.",
    "ai agent":
        "I build autonomous AI agents and multi-agent workflow systems. A key project is the AI Sales Intelligence Agent, which automates company research and generates meeting briefings for sales teams.",
    "n8n workflows":
        "I use n8n to build complex workflow automations that integrate various APIs, AI models, and business applications. This is central to my LinkedIn Automation Platform and AI Sales Agent, enabling human-in-the-loop processes and auto-publishing.",
    "prompt engineering":
        "I have strong skills in prompt engineering, which I use to control and get precise outputs from Large Language Models like Google Gemini. This is crucial for generating high-quality, context-aware content in my AI projects.",
    "ai sales agent":
        "The AI Sales Intelligence Agent is an AI-powered assistant that automatically gathers company information from news, websites, and social media, then generates meeting briefings to help sales teams prepare quickly.",
    "github":
        "You can find my projects and code on my GitHub profile. The link is in the contact section at the bottom of the page."
};

const sendBtn = document.getElementById("send-btn");

if (sendBtn) {
    sendBtn.addEventListener("click", function () {
        const input = document.getElementById("user-input");
        const message = input.value.trim().toLowerCase();

        if (message === "") return;

        addMessage(message, "user");

        const reply =
            responses[message] ||
            "🤖 Sorry, I don't know that yet. Try one of the suggested questions!";

        setTimeout(() => {
            addMessage(reply, "bot");
        }, 500);

        input.value = "";
    });
}

function addMessage(text, sender) {
    const chatBody = document.getElementById("chat-body");
    const msg = document.createElement("div");

    msg.className = sender === "user" ? "user-message" : "bot-message";
    msg.innerHTML = text;

    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function askQuestion(question) {
    addMessage(getButtonLabel(question), "user");

    setTimeout(() => {
        const reply = responses[question.toLowerCase()] ||
            "Sorry, I don't have information about that yet.";

        addMessage(reply, "bot");
    }, 300);
}

function getButtonLabel(question){
    const labels = {
        "linkedin ai": "🚀 LinkedIn AI",
        "ai agent": "🤖 AI Agent",
        "n8n workflows": "⚡ n8n Workflows",
        "prompt engineering": "🧠 Prompt Engineering",
        "ai sales agent": "📈 AI Sales Agent",
        "show me your resume": "📄 Resume",
        "github": "💻 GitHub",
        "how can i contact you": "📧 Contact"
    };

    return labels[question.toLowerCase()] || question;
}

// ===== AI Assistant Toggle =====
document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById("chat-toggle");
    const box = document.getElementById("chat-box");

    console.log(btn);
    console.log(box);

    if (btn && box) {
        btn.addEventListener("click", function () {
            box.classList.toggle("active");
        });
    }

});
