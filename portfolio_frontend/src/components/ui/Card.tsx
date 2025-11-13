import React from "react";

/**
 * PUBLIC_INTERFACE
 * Card primitive with glassmorphism and gradient border. Accepts hover/focus classes via className.
 */
export default function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`glass gradient-border p-6 transition-shadow transition-transform duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
