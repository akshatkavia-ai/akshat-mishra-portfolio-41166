"use client";

import Container from "../ui/Container";
import GradientText from "../ui/GradientText";
import Glow from "../ui/Glow";
import { personal } from "@/data/personal";
import { useInView } from "@/hooks/useInView";

/**
 * Hero section with animated greeting, compact social icon buttons,
 * and a separate resume link. Preserves glow/gradient accents and
 * sticky-scroll-friendly section anchor spacing.
 */
export default function Hero() {
  const { ref } = useInView<HTMLDivElement>();
  const hasResume = Boolean(personal?.resumeUrl && personal.resumeUrl.trim().length > 0);

  return (
    <section id="home" className="relative py-24 md:py-32" data-section>
      <Container>
        <div
          ref={ref}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-8 md:p-12"
        >
          {/* Preserve existing glow/gradient accents */}
          <Glow className="-top-24 -left-24 animate-glow-pulse" />
          <Glow
            className="-bottom-24 -right-24 animate-glow-pulse"
            color="from-emerald-500/30 to-orange-500/30"
          />

          <div className="reveal">
            <p className="text-sm text-zinc-300">Hello, I am</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold">
              <GradientText>{personal.name}</GradientText>
            </h1>
            <p className="mt-2 text-xl text-zinc-200">{personal.title}</p>
            <p className="mt-4 max-w-2xl text-zinc-300">{personal.tagline}</p>

            {/* Animated message - respects prefers-reduced-motion via globals.css */}
            <p
              className="mt-6 inline-block text-lg font-semibold bg-gradient-to-r from-orange-400 via-orange-500 to-emerald-400 bg-clip-text text-transparent will-change-transform"
              style={{ animation: "fade-in 700ms var(--ease-out) both" }}
              aria-live="polite"
            >
              {"let\u2019s connect \ud83d\ude80"}
            </p>

            {/* Compact row: social icon buttons + resume link */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* GitHub */}
              <a
                href={personal.social.github}
                target="_blank"
                rel="noreferrer"
                className="btn h-10 w-10 rounded-full border border-white/10 bg-white/[0.06] text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                aria-label="GitHub profile"
                title="GitHub"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.46 11.46 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.81 5.63-5.49 5.93.43.37.81 1.09.81 2.2v3.26c0 .32.21.69.82.58A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn h-10 w-10 rounded-full border border-white/10 bg-white/[0.06] text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                aria-label="LinkedIn profile"
                title="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7 0h3.83v2.19h.05c.53-1 1.83-2.19 3.77-2.19C20.07 8 24 10.6 24 16.2V24h-4v-6.9c0-3.4-1.2-5.7-4.2-5.7-2.29 0-3.65 1.54-4.25 3.03-.22.53-.27 1.26-.27 2V24h-4V8z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href={`mailto:${personal.social.email}`}
                className="btn h-10 w-10 rounded-full border border-white/10 bg-white/[0.06] text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                aria-label="Send email"
                title={personal.social.email}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.3-.5 7.2 5.4L18.7 6H4.3Zm15.2 2.1-6.64 4.98a1.5 1.5 0 0 1-1.82 0L4.4 8.1V17.5c0 .28.22.5.5.5h14.2c.28 0 .5-.22.5-.5V8.1Z" />
                </svg>
              </a>

              {/* Resume link/button - separate from icons */}
              {hasResume ? (
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-1 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  aria-label="View resume"
                  title="View resume"
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500"
                    aria-hidden="true"
                  />
                  <span>Resume</span>
                </a>
              ) : (
                <button
                  className="ml-1 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-zinc-400 cursor-not-allowed"
                  aria-disabled="true"
                  disabled
                  title="Resume not available"
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full bg-zinc-500"
                    aria-hidden="true"
                  />
                  <span>Resume</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
