"use client";

import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

// PUBLIC_INTERFACE
export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  /** Button with theme-aware variants and sizes. */
  const base =
    "btn rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<Variant, string> = {
    primary:
      "bg-orange-500 text-black hover:bg-orange-400 active:bg-orange-600",
    secondary:
      "bg-white text-black hover:bg-zinc-200 active:bg-zinc-300 border border-white/10",
    ghost:
      "bg-white/5 text-white hover:bg-white/10 border border-white/10 active:bg-white/15",
  };
  const sizes: Record<Size, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-3 text-lg",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    />
  );
}
