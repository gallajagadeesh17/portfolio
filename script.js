document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio Ready!");

  // Hero Typing Effect
  const typingText = document.querySelector(".typing-text");
  if (typingText) {
    const phrases = ["AI ENGINEER", "AUTOMATION DEV", "ML DEVELOPER"];
    let i = 0, j = 0, isDeleting = false;
    
    function typeLoop() {
      const currentPhrase = phrases[i];
      typingText.innerHTML = currentPhrase.substring(0, j);
      
      if (!isDeleting) {
        if (j < currentPhrase.length) {
          j++;
          setTimeout(typeLoop, 100);
        } else {
          isDeleting = true;
          setTimeout(typeLoop, 1500);
        }
      } else {
        if (j > 0) {
          j--;
          setTimeout(typeLoop, 50);
        } else {
          isDeleting = false;
          i = (i + 1) % phrases.length;
          setTimeout(typeLoop, 500);
        }
      }
    }
    typeLoop();
  }

  // Fade animation on scroll
  const animatedElements = document.querySelectorAll(
    ".bento-card, .project-card, .timeline-item, .skill-category"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // AI Chat Bot
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

  const chatToggle = document.getElementById("chat-toggle");
  const chatBox = document.getElementById("chat-box");
  const closeChat = document.getElementById("close-chat");
  const quickQuestionsContainer = document.querySelector(".quick-questions");

  if (chatToggle && chatBox && closeChat) {
    chatToggle.addEventListener("click", () => chatBox.classList.add("active"));
    closeChat.addEventListener("click", () => chatBox.classList.remove("active"));
  }

  function addMessage(text, sender, isHTML = false) {
    const chatBody = document.getElementById("chat-body");
    const msg = document.createElement("div");
    msg.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    
    if (isHTML) {
      msg.innerHTML = text;
    } else {
      msg.textContent = text;
    }
    
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function askQuestion(questionKey, questionText) {
    addMessage(questionText, "user");
    
    setTimeout(() => {
      const reply = responses[questionKey] || "Sorry, I don't have information about that yet.";
      addMessage(reply, "bot");
    }, 300);
  }

  if (quickQuestionsContainer) {
    quickQuestionsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-question')) {
        const questionKey = e.target.dataset.question;
        const questionText = e.target.textContent.trim();
        askQuestion(questionKey, questionText);
      }
    });
  }

  // Mobile Menu
  const menuToggle = document.getElementById('menu-toggle');
  const navUl = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul a');

  if (menuToggle && navUl) {
    menuToggle.addEventListener('click', () => {
      navUl.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navUl.classList.remove('active');
      });
    });
  }

  // Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector('nav a[href*=' + sectionId + ']').classList.add('active');
      } else {
        document.querySelector('nav a[href*=' + sectionId + ']').classList.remove('active');
      }
    });
  });

  // Update project count
  const projectGrid = document.querySelector('.projects-grid');
  if (projectGrid) {
      const projectCount = projectGrid.querySelectorAll('.project-card:not(.featured)').length;
      const projectsBuiltStat = document.querySelector('.hero-stats .stat-card:first-child h2');
      if (projectsBuiltStat) {
          projectsBuiltStat.textContent = `${projectCount}+`;
      }
  }

  // Mouse Spotlight Effect
  const spotlight = document.getElementById('spotlight');
  if (spotlight) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.left = `${e.pageX}px`;
      spotlight.style.top = `${e.pageY}px`;
    });
  }

  // 3D Tilt Effect for Cards
  function apply3DTilt(selector, maxTilt = 8) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const { width, height } = rect;
        const rotateX = (y / height - 0.5) * -maxTilt;
        const rotateY = (x / width - 0.5) * maxTilt;

        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }

  apply3DTilt('.project-card');
  apply3DTilt('.bento-card');

  // Magnetic Buttons
  function applyMagneticEffect(selector, strength = 40) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        
        if (distance < strength) {
          button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.03)`;
        } else {
          button.style.transform = 'translate(0,0) scale(1.03)'; // Keep scale from hover
        }
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0,0) scale(1)';
      });
    });
  }

  // Apply only to hero buttons for a focused effect
  applyMagneticEffect('.hero-buttons .btn');


  // Command Palette
  const commandPalette = document.getElementById('command-palette');
  const paletteInput = document.getElementById('palette-input');
  const paletteResults = document.getElementById('palette-results');
  const paletteOverlay = document.getElementById('palette-overlay');

  const commands = [
    { name: 'Home', category: 'Navigation', icon: 'fa-solid fa-house', action: () => window.location.href = '#home' },
    { name: 'About Me', category: 'Navigation', icon: 'fa-solid fa-user', action: () => window.location.href = '#about' },
    { name: 'Skills', category: 'Navigation', icon: 'fa-solid fa-code', action: () => window.location.href = '#skills' },
    { name: 'Projects', category: 'Navigation', icon: 'fa-solid fa-folder-open', action: () => window.location.href = '#projects' },
    { name: 'Career Journey', category: 'Navigation', icon: 'fa-solid fa-timeline', action: () => window.location.href = '#journey' },
    { name: 'Contact Me', category: 'Navigation', icon: 'fa-solid fa-envelope', action: () => window.location.href = '#contact' },
    { name: 'View Resume', category: 'Link', icon: 'fa-solid fa-file-pdf', action: () => window.open('resume.pdf', '_blank') },
    { name: 'View GitHub', category: 'Link', icon: 'fa-brands fa-github', action: () => window.open('https://github.com/gallajagadeesh17', '_blank') },
    { name: 'View LinkedIn', category: 'Link', icon: 'fa-brands fa-linkedin', action: () => window.open('https://linkedin.com/in/galla-jagadeesh-001310298', '_blank') },
    { name: 'Toggle Chatbot', category: 'Action', icon: 'fa-solid fa-robot', action: () => document.getElementById('chat-box').classList.toggle('active') },
  ];

  function openPalette() {
    commandPalette.classList.remove('command-palette-hidden');
    paletteInput.value = '';
    renderResults(commands);
    paletteInput.focus();
  }

  function closePalette() {
    commandPalette.classList.add('command-palette-hidden');
  }

  function renderResults(results) {
    paletteResults.innerHTML = '';
    if (results.length === 0) {
      paletteResults.innerHTML = `<li class="no-results">No results found</li>`;
      return;
    }
    results.forEach((command, index) => {
      const li = document.createElement('li');
      li.dataset.index = index;
      li.innerHTML = `
        <div class="item-text">
          <i class="${command.icon}"></i>
          <span>${command.name}</span>
        </div>
        <span class="item-category">${command.category}</span>
      `;
      li.addEventListener('click', () => {
        command.action();
        closePalette();
      });
      paletteResults.appendChild(li);
    });
    // Select the first item
    if (paletteResults.firstChild) {
      paletteResults.firstChild.classList.add('selected');
    }
  }

  function handleSearch() {
    const query = paletteInput.value.toLowerCase();
    const filteredCommands = commands.filter(command => 
      command.name.toLowerCase().includes(query) || 
      command.category.toLowerCase().includes(query)
    );
    renderResults(filteredCommands);
  }

  function handleKeyboardNav(e) {
    const items = paletteResults.querySelectorAll('li');
    if (items.length === 0) return;

    let selectedIndex = -1;
    items.forEach((item, index) => {
      if (item.classList.contains('selected')) {
        selectedIndex = index;
      }
    });

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedIndex < items.length - 1) {
        if (selectedIndex > -1) items[selectedIndex].classList.remove('selected');
        items[selectedIndex + 1].classList.add('selected');
        items[selectedIndex + 1].scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedIndex > 0) {
        items[selectedIndex].classList.remove('selected');
        items[selectedIndex - 1].classList.add('selected');
        items[selectedIndex - 1].scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex > -1) {
        items[selectedIndex].click();
      }
    }
  }

  // Event Listeners
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openPalette();
    }
    if (e.key === 'Escape' && !commandPalette.classList.contains('command-palette-hidden')) {
      closePalette();
    }
  });

  paletteInput.addEventListener('input', handleSearch);
  paletteInput.addEventListener('keydown', handleKeyboardNav);
  paletteOverlay.addEventListener('click', closePalette);
});
