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
    "I am Galla Jagadeesh, a B.Tech CSE-AI student passionate about AI Agents, workflow automation, and full-stack development. I enjoy building AI-powered applications that solve real-world problems.",

  "what are your technical skills":
    "My core skills include Python, Flask, HTML, CSS, SQL, Machine Learning, NLP, n8n Automation, AI Automation, Prompt Engineering, GitHub, and Scikit-learn.",

  "what projects have you built":
    "I have built a MoodFlix Movie Recommendation System, a Spam Email Detection System, and I am currently building an AI Sales Intelligence Agent using n8n and AI workflows.",

  "what is your ai sales intelligence agent":
    "It is an AI-powered assistant that automatically gathers company information from news, websites, and social media, then generates meeting briefings to help sales teams prepare quickly.",

  "are you looking for internships":
    "Yes! I am actively looking for AI, Software Development, UI/UX, and AI Automation internship opportunities.",

  "show me your resume":
    "You can view my resume by clicking the Resume button in the navigation bar or the floating Resume button on this page.",

  "how can i contact you":
    "You can reach me through Email, GitHub, or LinkedIn using the contact section below."
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
        "tell me about yourself":"👨‍💻 About Me",
        "what are your technical skills":"🛠 Skills",
        "what projects have you built":"🚀 Projects",
        "what is your ai sales intelligence agent":"🤖 AI Agent",
        "show me your resume":"📄 Resume",
        "how can i contact you":"📧 Contact"
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
