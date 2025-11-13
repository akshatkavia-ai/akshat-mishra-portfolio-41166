"use client";

import { useMemo, useRef, useState } from "react";
import GradientText from "../ui/GradientText";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { submitContact, ContactPayload } from "@/lib/contact";
import { personal } from "@/data/personal";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || "").trim();

export default function Contact() {
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const configured = useMemo(() => API_BASE.length > 0, []);

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

    if (!configured) {
      setNotice({
        type: "error",
        msg: "Contact form requires configuration. Please set NEXT_PUBLIC_API_BASE to your form endpoint.",
      });
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

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          <GradientText>Contact</GradientText>
        </h2>
        <p className="text-muted mt-1">
          I’d love to hear about opportunities or collaborations.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-white">Get in touch</h3>
          <p className="text-zinc-300 mt-2">
            Email:{" "}
            <a
              href={`mailto:${personal.social.email}`}
              className="underline underline-offset-4 decoration-white/30 hover:text-white"
            >
              {personal.social.email}
            </a>
          </p>
          <p className="text-zinc-300">
            LinkedIn:{" "}
            <a
              href={personal.social.linkedin}
              className="underline underline-offset-4 decoration-white/30 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              {personal.social.linkedin}
            </a>
          </p>
          <p className="text-zinc-300">
            GitHub:{" "}
            <a
              href={personal.social.github}
              className="underline underline-offset-4 decoration-white/30 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              {personal.social.github}
            </a>
          </p>
        </Card>

        <Card>
          <form onSubmit={onSubmit} noValidate>
            {!configured && (
              <div
                role="status"
                className="mb-4 rounded-md border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-sm text-yellow-300"
              >
                Contact form requires configuration. Please set
                {" "}NEXT_PUBLIC_API_BASE{" "}
                to your form endpoint.
              </div>
            )}
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
                <label htmlFor="name" className="text-sm text-zinc-300">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your name"
                  disabled={pending}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-zinc-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
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
                <label htmlFor="message" className="text-sm text-zinc-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="mt-1 h-28 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="How can I help?"
                  disabled={pending}
                  required
                />
              </div>
              <div className="flex items-center justify-end">
                <Button type="submit" disabled={!configured || pending}>
                  {pending ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
