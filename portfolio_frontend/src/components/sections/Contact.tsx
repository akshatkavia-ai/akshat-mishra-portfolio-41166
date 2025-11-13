"use client";

import { useRef, useState } from "react";
import GradientText from "../ui/GradientText";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { submitContact, ContactPayload } from "@/lib/contact";
import { personal } from "@/data/personal";

export default function Contact() {
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  function validate(p: ContactPayload) {
    if (!p.name || p.name.trim().length < 2) return "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(p.email)) return "Please enter a valid email.";
    if (!p.message || p.message.trim().length < 10)
      return "Please enter a message (min 10 characters).";
    if (p.honeypot && p.honeypot.length > 0) return "Spam detected.";
    return null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: ContactPayload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      honeypot: String(formData.get("url") || ""),
    };

    const invalid = validate(payload);
    if (invalid) {
      setNotice({ type: "error", msg: invalid });
      return;
    }

    setPending(true);
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const res = await submitContact(payload, abortRef.current.signal);
    setPending(false);
    setNotice({
      type: res.success ? "success" : "error",
      msg: res.message,
    });
    if (res.success) form.reset();
  }

  function IconButton({
    href,
    label,
    children,
  }: {
    href: string;
    label: string;
    children: React.ReactNode;
  }) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        aria-label={label}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="group inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 icon-glow"
      >
        {children}
      </a>
    );
  }

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          <GradientText>Contact</GradientText>
        </h2>
        <p className="text-muted mt-2">
          I&apos;d love to hear about opportunities or collaborations.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Primary: Contact Form */}
        <Card>
          <form onSubmit={onSubmit} noValidate>
            {notice && (
              <div
                role="status"
                className={`mb-4 rounded-md border px-3 py-2 text-sm ${
                  notice.type === "success"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border-red-500/30 bg-red-500/10 text-red-300"
                }`}
              >
                {notice.msg}
              </div>
            )}
            <div className="grid gap-3">
              <div>
                <label htmlFor="name" className="text-sm text-default">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-default outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your name"
                  disabled={pending}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-default">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-default outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="you@example.com"
                  disabled={pending}
                  required
                />
              </div>
              {/* Honeypot */}
              <div className="hidden">
                <label htmlFor="url">Website</label>
                <input id="url" name="url" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div>
                <label htmlFor="message" className="text-sm text-default">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="mt-1 h-28 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-default outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="How can I help?"
                  disabled={pending}
                  required
                />
              </div>
              <div className="flex items-center justify-end">
                <Button type="submit" disabled={pending}>
                  {pending ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* Secondary: Icon links (no text links) */}
        <Card>
          <h3 className="font-semibold text-strong">Connect</h3>
          <p className="text-default mt-2">
            Prefer reaching out directly? Use one of the quick links below.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <IconButton href={personal.social.github} label="Visit GitHub profile">
              <svg
                className="h-5 w-5 transition-transform duration-200 group-hover:scale-105"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.67-.3-5.47-1.34-5.47-5.98 0-1.32.47-2.39 1.25-3.23-.13-.3-.54-1.51.12-3.15 0 0 1.01-.32 3.31 1.23a11.5 11.5 0 0 1 6.02 0c2.3-1.55 3.31-1.23 3.31-1.23.66 1.64.25 2.85.12 3.15.78.84 1.25 1.91 1.25 3.23 0 4.65-2.8 5.68-5.48 5.98.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z" />
              </svg>
            </IconButton>

            <IconButton href={personal.social.linkedin} label="Open LinkedIn profile">
              <svg
                className="h-5 w-5 transition-transform duration-200 group-hover:scale-105"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5V24H0zM8.98 8.98h4.79v2.05h.07c.67-1.27 2.29-2.61 4.72-2.61 5.05 0 5.99 3.32 5.99 7.64V24h-5v-6.73c0-1.61-.03-3.68-2.24-3.68-2.25 0-2.6 1.75-2.6 3.56V24h-5z" />
              </svg>
            </IconButton>

            <IconButton href={`mailto:${personal.social.email}`} label="Send email">
              <svg
                className="h-5 w-5 transition-transform duration-200 group-hover:scale-105"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M20 4H4a2 2 0 0 0-2 2v.4l10 6.25L22 6.4V6a2 2 0 0 0-2-2Zm0 4.15-8 5-8-5V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.15Z" />
              </svg>
            </IconButton>
          </div>
        </Card>
      </div>
    </div>
  );
}
