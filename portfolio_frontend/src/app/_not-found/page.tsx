import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">Page not found</h1>
        <p className="mt-2 text-zinc-300">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex mt-6 rounded-md bg-orange-500 px-4 py-2 text-black hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 transition-colors"
          aria-label="Go back to home"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
