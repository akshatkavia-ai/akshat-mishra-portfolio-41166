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
      <header className="mb-6 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          <GradientText>About</GradientText>
        </h2>
        <p className="text-muted mt-1">
          A short introduction and what I focus on.
        </p>
      </header>

      {/* Single column content after removing avatar/photo */}
      <div className="reveal">
        <Card>
          <p className="text-zinc-200 text-center md:text-left">
            I’m Akshat Mishra, a passionate Software Developer skilled in AI, Cloud, and Full-Stack development. I love creating innovative, scalable solutions that blend technology with creativity.
          </p>
          <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
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
