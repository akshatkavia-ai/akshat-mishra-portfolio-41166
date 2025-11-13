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
          
          const handleCardClick = () => {
            if (primaryHref) {
              if (external) {
                window.open(primaryHref, "_blank", "noreferrer");
              } else {
                window.location.href = primaryHref;
              }
            }
          };

          const handleKeyDown = (e: React.KeyboardEvent) => {
            if (primaryHref && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              handleCardClick();
            }
          };

          return (
            <div
              key={p.title}
              role={primaryHref ? "button" : undefined}
              tabIndex={primaryHref ? 0 : undefined}
              onClick={primaryHref ? handleCardClick : undefined}
              onKeyDown={primaryHref ? handleKeyDown : undefined}
              className="group focus-visible:outline-none no-underline-wrapper"
              aria-label={primaryHref ? `Open ${p.title}` : undefined}
            >
              <Card
                className={`relative transition-transform duration-200 ${
                  primaryHref ? "cursor-pointer group-hover:-translate-y-1 hover:shadow-[0_0_40px_-15px_rgba(249,115,22,0.5)]" : ""
                } focus-within:ring-2 focus-within:ring-orange-500/70`}
              >
                <h3 className="font-bold text-lg text-white no-underline">{p.title}</h3>
                <p className="text-zinc-300 mt-2 no-underline">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} className="group-hover:bg-white/10 no-underline">
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
                      className="inline-flex no-underline hover:no-underline"
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
                      className="inline-flex no-underline hover:no-underline"
                    >
                      <Button variant="secondary" size="sm">
                        GitHub
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
