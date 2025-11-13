import React from "react";

export default function Glow({
  className = "",
  color = "from-orange-500/30 to-emerald-500/30",
  size = "h-72 w-72",
  style,
}: {
  className?: string;
  color?: string;
  size?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={`glow absolute rounded-full blur-3xl ${size} bg-gradient-to-br ${color} ${className}`}
      style={style}
    />
  );
}
