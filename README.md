# Galla Jagadeesh — Premium Personal Developer Portfolio

A cinematic, high-performance personal developer portfolio built for **Galla Jagadeesh**, positioning him as an **AI & Automation Developer** and **Full-Stack Developer**.

---

## 🌟 Features

- **Cinematic Aesthetic**: Obsidian dark theme (`#05070e`), subtle violet/indigo glow, fine grid texture, and interactive HTML5 background canvas particles.
- **Fast Opening Intro**: Skippable loading screen with system initialization counter, typography reveal, and reduced-motion fallback.
- **Content Architecture**: Standalone data files in `content/` allowing total content updates without touching React component code.
- **Featured Case Studies**: Deep-dive interactive project modals detailing problems, solutions, n8n workflow steps, tech pills, and live demo / GitHub links.
- **Chronological Journey Timeline**: Interactive timeline showcasing CS education, Masai AIPM training track, and project milestones.
- **Visual Architecture Gallery**: Filterable visual showcase with high-res lightbox modals.
- **Custom Cursor & Microinteractions**: Desktop-only interactive follow cursor, magnetic hover buttons, active-section navbar indicators, and smooth scrolling.
- **SEO & Production Optimized**: Pre-configured with OpenGraph cards, Twitter meta tags, sitemap.xml, robots.txt, and 100% Vercel Hobby tier compatibility.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP (ScrollTrigger), Framer Motion, HTML5 Canvas
- **Icons**: Lucide React
- **Deployment**: Vercel Ready

---

## 📁 Project Structure

```
d:/AI/
├── app/
│   ├── globals.css         # Global styles, noise background & theme tokens
│   ├── layout.tsx          # Root layout with SEO & global overlays
│   └── page.tsx            # Main portfolio scenes orchestrator
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Floating nav with mobile slide-down drawer
│   │   └── Footer.tsx      # Minimal footer with back-to-top button
│   ├── sections/
│   │   ├── Intro.tsx       # Fast skippable cinematic loader
│   │   ├── Hero.tsx        # Hero headline, focal image & compact stats
│   │   ├── About.tsx       # Editorial narrative & current status
│   │   ├── Journey.tsx     # Chronological timeline
│   │   ├── Skills.tsx      # Categorized tech stack grid
│   │   ├── Work.tsx        # Featured work cards with detail modal trigger
│   │   ├── Experience.tsx  # Verified experience & achievements
│   │   ├── Certifications.tsx # Stacked certification cards
│   │   ├── GithubSection.tsx  # "Building in Public" open-source section
│   │   ├── Gallery.tsx     # Visual gallery lightbox
│   │   └── Contact.tsx     # Final CTA with email copy button
│   └── ui/
│       ├── Cursor.tsx      # Interactive follow cursor (desktop only)
│       ├── ParticleCanvas.tsx # 60fps HTML5 Canvas background
│       ├── MagneticButton.tsx # Hover magnetic attraction button wrapper
│       ├── SectionHeading.tsx # Reusable section title with index badge
│       ├── ProjectModal.tsx   # Rich project detail modal
│       └── ImageModal.tsx     # Lightbox preview modal
├── content/
│   ├── profile.ts          # Hero bio, positioning, stats, location
│   ├── projects.ts         # Featured projects (LinkedIn Finder, MAKKMAL, BESCOM)
│   ├── skills.ts           # Categorized skills matrix
│   ├── journey.ts          # Chronological timeline events
│   ├── experience.ts       # Verified experience & achievements
│   ├── certifications.ts   # Certificate credentials & issuer data
│   ├── gallery.ts          # Visual screenshot items
│   └── socials.ts          # GitHub, LinkedIn, Email, Resume URLs
├── public/
│   ├── images/             # Profile, project, and certificate visuals
│   ├── robots.txt          # Search engine configuration
│   └── sitemap.xml         # XML sitemap
├── lib/
│   ├── gsap.ts             # GSAP & ScrollTrigger initialization
│   └── utils.ts            # Tailwind class merger helper (`cn`)
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ✏️ How to Edit Content

To update any text, project details, or credentials, edit the corresponding file in `content/`:

1. **Profile & Stats**: Edit `content/profile.ts`
2. **Featured Projects**: Edit `content/projects.ts`
3. **Skills & Tech Stack**: Edit `content/skills.ts`
4. **Journey Timeline**: Edit `content/journey.ts`
5. **Certifications**: Edit `content/certifications.ts`
6. **Social & Contact Links**: Edit `content/socials.ts`
7. **Profile Image**: Replace `/public/images/profile.png` with your photo.

---

## 🚀 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Start Production Server**:
   ```bash
   npm run start
   ```

---

## ☁️ Vercel Deployment

This project is built to deploy seamlessly on Vercel's Hobby (Free) Tier:

1. Push your repository to **GitHub**.
2. Go to [Vercel Dashboard](https://vercel.com/new) and select **Import Repository**.
3. Choose **Next.js** framework preset (detected automatically).
4. Click **Deploy**. No additional environment variables are required for standard deployment.

---

## 💡 Credits & Design Inspiration

The visual direction and interaction model were inspired by creative developer portfolios, featuring cinematic section transitions and minimalist obsidian dark theme aesthetics. The implementation, code architecture, components, and personal content are completely original.

