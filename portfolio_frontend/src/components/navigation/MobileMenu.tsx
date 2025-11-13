"use client";

import { useEffect, useRef } from "react";

type Item = { id: string; label: string };

/**
 * PUBLIC_INTERFACE
 * MobileMenu component - Accessible mobile navigation menu with focus trap and smooth transitions
 */
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);

  // Handle Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    if (open) {
      document.addEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus trap
  useEffect(() => {
    if (open && dialogRef.current) {
      // Focus the close button when menu opens
      closeButtonRef.current?.focus();

      const dialogElement = dialogRef.current;
      const focusableElements = dialogElement.querySelectorAll(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      };

      dialogElement.addEventListener("keydown", handleTab as EventListener);
      return () => {
        dialogElement.removeEventListener(
          "keydown",
          handleTab as EventListener
        );
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Backdrop with smooth transition */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" />

      {/* Menu Panel with slide-in animation */}
      <div
        className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-gray-900 via-black to-gray-900 border-l border-white/10 shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        ref={dialogRef}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent">
            Menu
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            className="p-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            aria-label="Close menu"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Mobile Navigation">
          <ul className="space-y-2">
            {items.map((item, index) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    ref={index === 0 ? firstFocusableRef : undefined}
                    href={`#${item.id}`}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500/20 to-emerald-500/10 text-strong border border-orange-500/30 shadow-lg shadow-orange-500/10"
                        : "text-default hover:text-strong hover:bg-white/5 border border-transparent"
                    }`}
                    onClick={(e) => {
                      // Smooth scroll
                      e.preventDefault();
                      const target = document.getElementById(item.id);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                      }
                      onClose();
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="flex items-center gap-3">
                      {/* Icon indicator */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-orange-500" : "bg-zinc-600"
                        }`}
                        aria-hidden="true"
                      />
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer decoration */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <p className="text-xs text-muted text-center">
            © 2024 Akshat Mishra
          </p>
        </div>
      </div>
    </div>
  );
}
