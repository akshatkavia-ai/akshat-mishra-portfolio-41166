"use client";

import { useEffect, useRef } from "react";

type Item = { id: string; label: string };

export default function MobileMenu({
  id,
  open,
  onClose,
  items,
  activeId,
}: {
  id?: string;
  open: boolean;
  onClose: () => void;
  items: Item[];
  activeId?: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 md:hidden"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="absolute right-0 top-0 h-full w-80 glass gradient-border p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        ref={dialogRef}
      >
        <div className="flex items-center justify-between">
          <span className="font-bold">Menu</span>
          <button
            type="button"
            className="btn px-2 py-1 bg-white/10 hover:bg-white/20"
            aria-label="Close menu"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-6" aria-label="Mobile Navigation">
          <ul className="space-y-2">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-orange-500/20 text-white"
                        : "text-zinc-300 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
