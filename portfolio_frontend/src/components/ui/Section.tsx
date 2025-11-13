import React from "react";

export default function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-section
      className={`scroll-mt-24 py-16 md:py-24 ${className}`}
    >
      {children}
    </section>
  );
}
