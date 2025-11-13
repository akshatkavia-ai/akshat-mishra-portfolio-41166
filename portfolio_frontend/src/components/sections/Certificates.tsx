"use client";

import GradientText from "../ui/GradientText";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { certificates } from "@/data/certificates";
import { useInView } from "@/hooks/useInView";

export default function Certificates() {
  const { ref } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="in-view">
      <header className="mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          <GradientText>Certificates</GradientText>
        </h2>
        <p className="text-muted mt-1">Credentials and recognitions.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
        {certificates.map((c) => {
          const clickable = !!c.credentialUrl;
          return (
            <a
              key={`${c.issuer}-${c.title}`}
              href={c.credentialUrl || undefined}
              target={clickable ? "_blank" : undefined}
              rel={clickable ? "noreferrer" : undefined}
              className={`block group ${clickable ? "focus-visible:outline-none" : ""}`}
              aria-label={clickable ? `View credential for ${c.title}` : undefined}
            >
              <Card
                className={`transition-transform duration-200 ${clickable ? "group-hover:-translate-y-1 hover:shadow-[0_0_40px_-15px_rgba(249,115,22,0.5)] focus-within:ring-2 focus-within:ring-orange-500/70" : ""}`}
              >
                {clickable && <span className="absolute inset-0" aria-hidden="true" />}
                <h3 className="font-semibold text-white">{c.title}</h3>
                <p className="text-sm text-zinc-300">{c.issuer}</p>
                <p className="text-xs text-zinc-400 mt-1">{c.date}</p>
                {c.credentialUrl && (
                  <span className="mt-3 inline-flex">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Open credential for ${c.title}`}
                    >
                      View Credential
                    </Button>
                  </span>
                )}
              </Card>
            </a>
          );
        })}
      </div>
    </div>
  );
}
