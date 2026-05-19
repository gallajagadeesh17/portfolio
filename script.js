console.log("Advanced Professional Portfolio Loaded 🚀");

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
