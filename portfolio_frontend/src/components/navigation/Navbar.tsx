"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Container from "../ui/Container";
import GradientText from "../ui/GradientText";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-section], main#home")
    );
    const headerOffset = 88;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id || "home";
          if (entry.isIntersecting) {
            setActive(id);
          } else {
            // if leaving the top hero, keep currently visible section
          }
        });
      },
      {
        rootMargin: `-${headerOffset}px 0px -60% 0px`,
        threshold: [0.1, 0.5, 0.75],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navLinks = useMemo(
    () =>
      NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "text-white bg-orange-500/20"
                  : "text-zinc-300 hover:text-white hover:bg-white/5"
              }`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          </li>
        );
      }),
    [active]
  );

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10"
      role="banner"
    >
      <Container className="flex items-center justify-between py-4">
        <Link
          href="#home"
          aria-label="Go to home"
          className="group inline-flex items-center gap-2"
        >
          <div className="size-8 rounded-md bg-gradient-to-br from-orange-500/80 to-emerald-500/80 grid place-content-center">
            <span className="text-black font-extrabold">A</span>
          </div>
          <div className="leading-5">
            <span className="sr-only">Akshat Mishra</span>
            <GradientText className="text-lg font-extrabold">
              Akshat Mishra
            </GradientText>
            <div className="text-[10px] text-zinc-400 -mt-0.5">
              Software Developer
            </div>
          </div>
        </Link>

        <nav
          className="hidden md:block"
          role="navigation"
          aria-label="Primary Navigation"
        >
          <ul className="flex items-center gap-1">{navLinks}</ul>
        </nav>

        <button
          type="button"
          className="md:hidden btn px-3 py-2 bg-white/5 hover:bg-white/10 text-white"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <MobileMenu
          id="mobile-menu"
          open={open}
          onClose={() => setOpen(false)}
          items={NAV_ITEMS}
          activeId={active}
        />
      </Container>
    </header>
  );
}
