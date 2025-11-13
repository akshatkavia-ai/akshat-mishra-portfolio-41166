"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "../ui/Container";
import GradientText from "../ui/GradientText";
import MobileMenu from "./MobileMenu";

const navigationItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
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

          {/* Hamburger Menu Button - Visible on mobile */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="block sm:block md:block p-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
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
                // X icon when menu is open
                <>
                  <path d="M6 18L18 6M6 6l12 12" />
                </>
              ) : (
                // Hamburger icon when menu is closed
                <>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </Container>
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
