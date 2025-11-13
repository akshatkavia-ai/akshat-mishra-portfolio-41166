"use client";

import Container from "../ui/Container";
import GradientText from "../ui/GradientText";
import Button from "../ui/Button";
import Glow from "../ui/Glow";
import { personal } from "@/data/personal";
import { useInView } from "@/hooks/useInView";

export default function Hero() {
  const { ref } = useInView<HTMLDivElement>();

  return (
    <section id="home" className="relative py-24 md:py-32" data-section>
      <Container>
        <div
          ref={ref}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-8 md:p-12"
        >
          <Glow className="-top-24 -left-24" />
          <Glow className="-bottom-24 -right-24" color="from-emerald-500/30 to-orange-500/30" />

          <div className="reveal">
            <p className="text-sm text-zinc-300">Hello, I am</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold">
              <GradientText>{personal.name}</GradientText>
            </h1>
            <p className="mt-2 text-xl text-zinc-200">{personal.title}</p>
            <p className="mt-4 max-w-2xl text-zinc-300">{personal.tagline}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects">
                <Button variant="primary" size="lg">
                  View Projects
                </Button>
              </a>
              <a href="#contact">
                <Button variant="ghost" size="lg">
                  Contact
                </Button>
              </a>
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm underline text-zinc-300 hover:text-white"
              >
                View Resume
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
