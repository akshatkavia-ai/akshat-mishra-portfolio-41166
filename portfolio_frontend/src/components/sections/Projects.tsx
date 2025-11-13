"use client";

import GradientText from "../ui/GradientText";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { projects } from "@/data/projects";
import { useInView } from "@/hooks/useInView";

export default function Projects() {
  const { ref } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="in-view">
      <header className="mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          <GradientText>Projects</GradientText>
        </h2>
        <p className="text-muted mt-1">
          Selected works showcasing engineering and product impact.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
        {projects.map((p) => {
          const primaryHref = p.links?.demo || p.links?.github || undefined;
          const external = primaryHref ? /^https?:\/\//.test(primaryHref) : false;
          return (
            <a
              key={p.title}
              href={primaryHref}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="group block focus-visible:outline-none"
              aria-label={primaryHref ? `Open ${p.title}` : undefined}
            >
              <Card
                className={`relative transition-transform duration-200 group-hover:-translate-y-1
                hover:shadow-[0_0_40px_-15px_rgba(249,115,22,0.5)] focus-within:ring-2 focus-within:ring-orange-500/70`}
              >
                {/* Make the whole card clickable via stretched link if primaryHref present */}
                {primaryHref && (
                  <span className="absolute inset-0" aria-hidden="true" />
                )}
                <h3 className="font-bold text-lg text-white">{p.title}</h3>
                <p className="text-zinc-300 mt-2">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} className="group-hover:bg-white/10">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex gap-3">
                  {p.links?.demo && (
                    <a
                      href={p.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open demo for ${p.title}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="sm">
                        Demo
                      </Button>
                    </a>
                  )}
                  {p.links?.github && (
                    <a
                      href={p.links.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open GitHub for ${p.title}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="secondary" size="sm">
                        GitHub
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            </a>
          );
        })}
      </div>
    </div>
  );
}
