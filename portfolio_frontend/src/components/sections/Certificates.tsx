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
        {certificates.map((c) => (
          <Card key={`${c.issuer}-${c.title}`}>
            <h3 className="font-semibold text-white">{c.title}</h3>
            <p className="text-sm text-zinc-300">{c.issuer}</p>
            <p className="text-xs text-zinc-400 mt-1">{c.date}</p>
            {c.credentialUrl && (
              <a
                href={c.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block"
              >
                <Button size="sm" variant="ghost">
                  View Credential
                </Button>
              </a>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
