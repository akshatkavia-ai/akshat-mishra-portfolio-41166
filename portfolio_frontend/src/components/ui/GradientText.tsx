import React from "react";

export default function GradientText({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-orange-400 via-orange-500 to-emerald-400 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
