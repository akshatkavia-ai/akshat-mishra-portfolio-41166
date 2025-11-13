import React from "react";

export default function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-200 ${className}`}
    >
      {children}
    </span>
  );
}
