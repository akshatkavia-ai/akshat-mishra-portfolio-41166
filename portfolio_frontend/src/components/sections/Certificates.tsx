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
          
          const handleCardClick = () => {
            if (c.credentialUrl) {
              window.open(c.credentialUrl, "_blank", "noreferrer");
            }
          };

          const handleKeyDown = (e: React.KeyboardEvent) => {
            if (clickable && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              handleCardClick();
            }
          };

          return (
            <div
              key={`${c.issuer}-${c.title}`}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              onClick={clickable ? handleCardClick : undefined}
              onKeyDown={clickable ? handleKeyDown : undefined}
              className={`group no-underline-wrapper ${clickable ? "focus-visible:outline-none" : ""}`}
              aria-label={clickable ? `View credential for ${c.title}` : undefined}
            >
              <Card
                className={`transition-transform duration-200 ${
                  clickable
                    ? "cursor-pointer group-hover:-translate-y-1 hover:shadow-[0_0_40px_-15px_rgba(249,115,22,0.5)] focus-within:ring-2 focus-within:ring-orange-500/70"
                    : ""
                }`}
              >
                <h3 className="font-semibold text-strong no-underline">{c.title}</h3>
                <p className="text-sm text-default no-underline">{c.issuer}</p>
                <p className="text-xs text-muted mt-1 no-underline">{c.date}</p>
                {c.credentialUrl && (
                  <span className="mt-3 inline-flex">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(c.credentialUrl, "_blank", "noreferrer");
                      }}
                      aria-label={`Open credential for ${c.title}`}
                    >
                      View Credential
                    </Button>
                  </span>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
