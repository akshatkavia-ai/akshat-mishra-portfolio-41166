"use client";

import Link from "next/link";
import Container from "../ui/Container";
import GradientText from "../ui/GradientText";

export default function Navbar() {
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

        {/* Navigation links and mobile menu removed as per requirements */}
        <div className="w-8" aria-hidden="true">{/* Spacer for visual balance */}</div>
      </Container>
    </header>
  );
}
