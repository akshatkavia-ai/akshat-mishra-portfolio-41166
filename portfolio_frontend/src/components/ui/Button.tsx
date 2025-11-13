"use client";

import React, { useMemo } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

/**
 * PUBLIC_INTERFACE
 * Accessible Button with theme-aware variants and subtle interactive hover/active states.
 * - Consistent focus-visible ring
 * - Subtle hover scale/glow unless prefers-reduced-motion
 * - Respects disabled state via aria-disabled and native disabled
 */
export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  // respect prefers-reduced-motion for hover scale
  const reduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const base =
    "btn rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 disabled:opacity-50 disabled:cursor-not-allowed";

  const hoverScale = reduced ? "" : "hover:scale-[1.015] active:scale-[0.995]";

  const variants: Record<Variant, string> = {
    primary:
      "bg-orange-500 text-black hover:bg-orange-400 active:bg-orange-600 shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_8px_30px_-12px_rgba(249,115,22,0.55)]",
    secondary:
      "bg-white text-black hover:bg-zinc-200 active:bg-zinc-300 border border-white/10 hover:shadow-[0_6px_24px_-12px_rgba(255,255,255,0.25)]",
    ghost:
      "bg-white/5 text-white hover:bg-white/10 border border-white/10 active:bg-white/15 hover:shadow-[0_6px_22px_-12px_rgba(255,255,255,0.18)]",
  };

  const sizes: Record<Size, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${hoverScale} ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    />
  );
}
