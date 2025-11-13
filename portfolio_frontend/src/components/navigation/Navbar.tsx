"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Container from "../ui/Container";
import GradientText from "../ui/GradientText";
import MobileMenu from "./MobileMenu";

/**
 * Navigation items for both desktop and mobile menus
 */
const navigationItems = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const underlineRef = useRef<HTMLSpanElement>(null);

  // Determine reduced motion preference
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Handle escape key to close menu and lock scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Track active section based on scroll position - scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);

      const sections = navigationItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      let foundActive = "home";
      for (const section of sections) {
        if (!section.element) continue;
        const rect = section.element.getBoundingClientRect();
        // Use a threshold near the top for accuracy
        if (rect.top <= 110 && rect.bottom >= 110) {
          foundActive = section.id;
          break;
        }
      }
      setActiveSection(foundActive);
    };

    handleScroll(); // initialize on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Move the underline to the active desktop link
  useEffect(() => {
    const underline = underlineRef.current;
    if (!underline) return;

    const activeLink = document.querySelector<HTMLAnchorElement>(
      `a[data-nav-link="${activeSection}"]`
    );
    const container = activeLink?.parentElement;
    if (!activeLink || !container) {
      underline.style.opacity = "0";
      return;
    }

    const linkRect = activeLink.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();

    underline.style.width = `${linkRect.width}px`;
    underline.style.transform = `translateX(${linkRect.left - parentRect.left}px)`;
    underline.style.opacity = "1";

    if (prefersReducedMotion) {
      // Snap instantly if user prefers reduced motion
      underline.style.transition = "none";
    } else {
      underline.style.transition =
        "transform 300ms var(--ease-out), width 300ms var(--ease-out), opacity 200ms";
    }
  }, [activeSection, prefersReducedMotion]);

  return (
    <>
      <header
        className="sticky top-0 z-50"
        role="banner"
        aria-label="Site header with navigation"
      >
        {/* Subtle animated gradient/glow accent bar behind navbar */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 h-16`}
        >
          <div
            className={`mx-auto h-full max-w-6xl px-4 md:px-6 transition-opacity duration-300
              ${scrolled ? "opacity-70" : "opacity-90"}`}
          >
            <div className="h-full w-full rounded-b-xl bg-[radial-gradient(1200px_60px_at_center_0%,rgba(249,115,22,0.25),transparent_60%)] blur-[6px]" />
          </div>
        </div>

        <div
          className={`backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10 transition-all`}
        >
          <Container className="flex items-center justify-between py-4">
            {/* Brand */}
            <Link
              href="#home"
              aria-label="Go to home"
              className="group inline-flex items-center gap-2 focus-visible:outline-none"
            >
              <div className="size-8 rounded-md bg-gradient-to-br from-orange-500/80 to-emerald-500/80 grid place-content-center shadow-sm">
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

            {/* Desktop nav (md+), keep hamburger for mobile */}
            <nav
              aria-label="Primary"
              className="hidden md:block relative"
              role="navigation"
            >
              <ul className="flex items-center gap-1">
                {navigationItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id} className="relative">
                      <a
                        href={`#${item.id}`}
                        data-nav-link={item.id}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                          ${isActive ? "text-white" : "text-zinc-300 hover:text-white"}
                          focus-visible:outline-none`}
                        onClick={(e) => {
                          e.preventDefault();
                          const target = document.getElementById(item.id);
                          if (target) {
                            target.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="relative inline-block">
                          {item.label}
                          {/* Hover underline indicator */}
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-0 right-0 -bottom-1 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-orange-500 via-orange-400 to-emerald-400 transition-transform duration-300 group-hover:scale-x-100"
                          />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              {/* Active section underline/indicator (smooth) */}
              <span
                ref={underlineRef}
                aria-hidden="true"
                className="absolute left-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-orange-500 via-orange-400 to-emerald-400 rounded-full opacity-0"
                style={{
                  willChange: "transform, width",
                }}
              />
            </nav>

            {/* Hamburger Menu Button - visible on all breakpoints but mainly used on mobile */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <>
                    <path d="M6 18L18 6M6 6l12 12" />
                  </>
                ) : (
                  <>
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </>
                )}
              </svg>
            </button>
          </Container>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        id="mobile-navigation-menu"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        items={navigationItems}
        activeId={activeSection}
      />
    </>
  );
}
