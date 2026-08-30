"use client";

import React, { useState, useEffect } from "react";
import { Intro } from "@/components/sections/Intro";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [introCompleted, setIntroCompleted] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setIntroCompleted(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    setIntroCompleted(true);
  };

  return (
    <main className="relative min-h-screen bg-background">
      {!introCompleted && <Intro onComplete={handleIntroComplete} />}

      <Navbar />

      <div className="relative">
        <Hero />
        <Marquee />
        <About />
        <Education />
        <Journey />
        <Skills />
        <Work />
        <Experience />
        <Certifications />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
