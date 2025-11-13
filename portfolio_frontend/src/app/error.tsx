"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-24">
      <section className="glass gradient-border max-w-2xl w-full p-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          Something went wrong
        </h1>
        <p className="mt-3 text-zinc-300">
          {process.env.NEXT_PUBLIC_NODE_ENV !== "production" && error?.message
            ? error.message
            : "An unexpected error occurred while rendering this page."}
        </p>
        <div className="mt-8">
          <button
            type="button"
            onClick={() => reset()}
            className="btn px-5 py-3 bg-orange-500 text-black hover:bg-orange-400"
          >
            Try again
          </button>
        </div>
      </section>
    </main>
  );
}
