import React from "react";

type ElementTag =
  | "div"
  | "section"
  | "nav"
  | "header"
  | "footer"
  | "main"
  | "aside"
  | "article";

type ContainerProps = React.HTMLAttributes<HTMLElement> & {
  as?: ElementTag;
  className?: string;
  children?: React.ReactNode;
};

// PUBLIC_INTERFACE
export default function Container({
  as = "div",
  className = "",
  children,
  ...rest
}: ContainerProps) {
  /** Responsive content container with optional polymorphic "as" element. */
  const Comp = as as unknown as React.ElementType;

  return (
    <Comp className={`mx-auto w-full max-w-6xl px-4 md:px-6 ${className}`} {...rest}>
      {children}
    </Comp>
  );
}
