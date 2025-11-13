import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-24">
      <section
        className="glass gradient-border max-w-2xl w-full p-8 text-center"
        role="alert"
        aria-live="assertive"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          404 — Page Not Found
        </h1>
        <p className="mt-3 text-muted">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="btn px-5 py-3 bg-white text-black hover:bg-zinc-200"
          >
            Go Home
          </Link>
          <a
            href="#contact"
            className="btn px-5 py-3 bg-orange-500/20 text-white border border-orange-500/50 hover:bg-orange-500/30"
          >
            Contact
          </a>
        </div>
      </section>
    </main>
  );
}
