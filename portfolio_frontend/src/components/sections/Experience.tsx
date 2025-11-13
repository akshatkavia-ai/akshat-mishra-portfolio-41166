"use client";

import GradientText from "../ui/GradientText";
import Card from "../ui/Card";
import { experience } from "@/data/experience";
import { useInView } from "@/hooks/useInView";

export default function Experience() {
  const { ref } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="in-view">
      <header className="mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          <GradientText>Experience</GradientText>
        </h2>
        <p className="text-muted mt-1">Where I’ve learned and contributed.</p>
      </header>

      <div className="space-y-6 reveal">
        {experience.map((e) => (
          <Card key={`${e.company}-${e.role}`} className="relative">
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-gradient-to-b from-orange-500/80 to-emerald-500/80" />
            <div className="pl-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold text-white">{e.role}</h3>
                <span className="text-xs text-zinc-400">{e.duration}</span>
              </div>
              <p className="text-sm text-zinc-300 mt-0.5">{e.company}</p>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-zinc-200">
                {e.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
