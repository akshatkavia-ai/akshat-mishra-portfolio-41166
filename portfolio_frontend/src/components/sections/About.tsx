"use client";

import Card from "../ui/Card";
import GradientText from "../ui/GradientText";
import Button from "../ui/Button";
import { personal } from "@/data/personal";
import { useInView } from "@/hooks/useInView";

export default function About() {
  const { ref } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="in-view">
      <header className="mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          <GradientText>About</GradientText>
        </h2>
        <p className="text-muted mt-1">
          A short introduction and what I focus on.
        </p>
      </header>

      <div className="grid md:grid-cols-[220px,1fr] gap-6 items-start reveal">
        <div className="relative">
          <div className="aspect-square rounded-xl bg-white/5 border border-white/10 grid place-content-center text-zinc-400">
            {/* Placeholder profile image block */}
            <span className="text-sm">Profile Image</span>
          </div>
        </div>

        <Card>
          <p className="text-zinc-200">
            I am a software developer passionate about building impactful
            products with AI-driven experiences and robust cloud foundations. I
            enjoy turning ideas into production-ready systems that scale.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a href={personal.resumeUrl} target="_blank" rel="noreferrer">
              <Button>Download Resume</Button>
            </a>
            <span className="text-sm text-zinc-400">{personal.location}</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
