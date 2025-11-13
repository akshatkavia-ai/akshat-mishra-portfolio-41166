import React from "react";

export default function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`glass gradient-border p-6 ${className}`}>{children}</div>;
}
