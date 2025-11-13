"use client";

import GradientText from "../ui/GradientText";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import { skills } from "@/data/skills";
import { useInView } from "@/hooks/useInView";

export default function Skills() {
  const { ref } = useInView<HTMLDivElement>();

  const onSkillClick = () => {
    // Optional behavior: scroll to projects if section exists; filter behavior can be wired later.
    const projects = document.getElementById("projects");
    if (projects) {
      projects.scrollIntoView({ behavior: "smooth" });
    }
    // No-op beyond scroll; filtering not implemented in current scope.
  };

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
              {group.items.map((_skill) => (
                <Badge
                  key={_skill}
                  onClick={() => onSkillClick()}
                  role="button"
                  aria-label={`Filter projects by ${String(_skill)}`}
                  className="hover:shadow-[0_0_0_2px_rgba(249,115,22,0.25)]"
                >
                  {_skill}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
