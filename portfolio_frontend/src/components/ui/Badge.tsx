import React from "react";

/**
 * PUBLIC_INTERFACE
 * Badge with interactive affordances. If onClick is provided or role="button" is set,
 * renders with button-like focus/hover styles; otherwise remains decorative.
 */
export default function Badge({
  children,
  className = "",
  onClick,
  role,
  tabIndex,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  role?: string;
  tabIndex?: number;
  "aria-label"?: string;
}) {
  const interactive = !!onClick || role === "button";
  return (
    <span
      role={role}
      aria-label={ariaLabel}
      tabIndex={interactive ? (typeof tabIndex === "number" ? tabIndex : 0) : tabIndex}
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs transition-colors transition-shadow duration-200
        ${interactive ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70" : ""}
        ${interactive ? "border-white/20 bg-white/10 text-zinc-100 hover:bg-white/15 hover:border-white/30" : "border-white/15 bg-white/5 text-zinc-200"}
        ${className}`}
    >
      {children}
    </span>
  );
}
