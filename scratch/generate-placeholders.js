const fs = require('fs');
const path = require('path');

const dirs = [
  'public/images',
  'public/images/projects',
  'public/images/certificates',
];

dirs.forEach(d => {
  const fullPath = path.join(process.cwd(), d);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

function generateSVG(title, subtitle, accentColor = '#8B5CF6', category = '') {
  return `<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0A0A" />
      <stop offset="50%" stop-color="#121212" />
      <stop offset="100%" stop-color="#050505" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accentColor}" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1" />
    </pattern>
  </defs>

  <rect width="1200" height="800" fill="url(#bg)" />
  <rect width="1200" height="800" fill="url(#grid)" />

  <rect x="40" y="40" width="1120" height="720" rx="20" fill="rgba(18, 18, 18, 0.8)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5" />

  <circle cx="80" cy="80" r="7" fill="#ef4444" opacity="0.8" />
  <circle cx="102" cy="80" r="7" fill="#f59e0b" opacity="0.8" />
  <circle cx="124" cy="80" r="7" fill="#10b981" opacity="0.8" />
  <line x1="40" y1="110" x2="1160" y2="110" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />

  ${category ? `
  <rect x="80" y="150" width="${category.length * 11 + 36}" height="32" rx="16" fill="rgba(139, 92, 246, 0.12)" stroke="rgba(139, 92, 246, 0.3)" stroke-width="1" />
  <text x="98" y="171" font-family="monospace" font-size="12" font-weight="700" fill="${accentColor}" letter-spacing="1.5">${category.toUpperCase()}</text>
  ` : ''}

  <text x="80" y="270" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" fill="#F5F2EA">${escapeXml(title)}</text>
  <text x="80" y="325" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#A7A39B">${escapeXml(subtitle)}</text>

  <rect x="80" y="365" width="100" height="4" rx="2" fill="url(#accent)" />

  <g opacity="0.2">
    <rect x="680" y="160" width="400" height="520" rx="12" fill="rgba(255,255,255,0.03)" stroke="${accentColor}" stroke-width="1" />
    <line x1="680" y1="240" x2="1080" y2="240" stroke="${accentColor}" stroke-width="1" />
    <line x1="680" y1="360" x2="1080" y2="360" stroke="${accentColor}" stroke-width="1" />
  </g>

  <text x="80" y="690" font-family="monospace" font-size="13" font-weight="600" fill="#64748b" letter-spacing="2">GALLA JAGADEESH — AI &amp; AUTOMATION PROJECT</text>
</svg>`;
}

function generateProfileSVG() {
  return `<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0A0A" />
      <stop offset="100%" stop-color="#121212" />
    </linearGradient>
    <linearGradient id="avatarGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
  </defs>

  <rect width="800" height="800" fill="url(#bg)" />
  <circle cx="400" cy="400" r="260" fill="none" stroke="url(#avatarGlow)" stroke-width="2" stroke-dasharray="6,6" opacity="0.5" />
  <circle cx="400" cy="400" r="230" fill="#121212" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" />

  <g transform="translate(250, 220)">
    <path d="M 150 180 C 110 180 80 210 80 250 L 80 320 C 80 330 90 340 100 340 L 200 340 C 210 340 220 330 220 320 L 220 250 C 220 210 190 180 150 180 Z" fill="#1e1b4b" />
    <circle cx="150" cy="120" r="50" fill="#312e81" />
    <rect x="110" y="105" width="80" height="24" rx="6" fill="#0f172a" stroke="url(#avatarGlow)" stroke-width="2" />
  </g>

  <rect x="150" y="600" width="500" height="90" rx="16" fill="rgba(18, 18, 18, 0.9)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
  <text x="400" y="640" font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="#F5F2EA" text-anchor="middle">GALLA JAGADEESH</text>
  <text x="400" y="668" font-family="monospace" font-size="13" font-weight="600" fill="#8B5CF6" text-anchor="middle" letter-spacing="1.5">AI &amp; AUTOMATION DEVELOPER</text>
</svg>`;
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

const files = [
  { path: 'public/images/profile.png', content: generateProfileSVG() },
  { path: 'public/images/projects/saarthi-ai.png', content: generateSVG('Saarthi-AI', 'AI Sales Intelligence Platform', '#8B5CF6', 'AI & Full-Stack') },
  { path: 'public/images/projects/linkedin-automation.png', content: generateSVG('LinkedIn Automation AI', 'Human-in-the-Loop Content Automation', '#38bdf8', 'AI Workflow') },
  { path: 'public/images/projects/project-archaeologist.png', content: generateSVG('Project Archaeologist', 'Multi-Agent GitHub Revival Analyzer', '#a855f7', 'Multi-Agent') },
  { path: 'public/images/projects/linkedin-job-finder.png', content: generateSVG('LinkedIn Job Finder Automation', 'Automated Job Sourcing Pipeline', '#8B5CF6', 'Automation') },
  { path: 'public/images/projects/spam-detection.png', content: generateSVG('AI Spam Email Detection System', 'Machine Learning Email Classifier', '#10b981', 'Machine Learning') },
  { path: 'public/images/certificates/oracle-genai.png', content: generateSVG('OCI 2025 Certified Generative AI Professional', 'Oracle Cloud Infrastructure Certification', '#8B5CF6', 'Certification') },
  { path: 'public/images/certificates/tata-genai.png', content: generateSVG('GenAI Powered Data Analytics Job Simulation', 'Tata Certification', '#38bdf8', 'Certification') },
  { path: 'public/images/certificates/tcs-ion.png', content: generateSVG('TCS iON Career Edge: Young Professional', 'Tata TCS iON Certification', '#6366f1', 'Certification') },
];

files.forEach(file => {
  fs.writeFileSync(path.join(process.cwd(), file.path), file.content, 'utf8');
  console.log(`Created placeholder asset: ${file.path}`);
});
