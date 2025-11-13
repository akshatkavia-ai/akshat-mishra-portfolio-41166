"use client";

import GradientText from "../ui/GradientText";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import { skills } from "@/data/skills";
import { useInView } from "@/hooks/useInView";

export default function Skills() {
  const { ref } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="in-view">
      <header className="mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          <GradientText>Skills</GradientText>
        </h2>
        <p className="text-muted mt-1">A snapshot of my current toolkit.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 reveal">
        {skills.map((group) => (
          <Card key={group.group}>
            <h3 className="font-semibold text-white">{group.group}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
