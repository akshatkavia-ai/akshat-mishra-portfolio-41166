import Container from "../ui/Container";
import { personal } from "@/data/personal";

function IconGithub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.24 1.83 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.43 11.43 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.61-5.47 5.91.43.37.81 1.1.81 2.23v3.31c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"
      />
    </svg>
  );
}

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.6c0-1.34-.02-3.07-1.87-3.07-1.88 0-2.17 1.46-2.17 2.97v5.7H9.31V9h3.41v1.56h.05c.48-.9 1.66-1.85 3.43-1.85 3.67 0 4.35 2.42 4.35 5.58v6.16ZM5.34 7.43a2.06 2.06 0 1 1 0-4.11 2.06 2.06 0 0 1 0 4.11ZM7.12 20.45H3.55V9h3.57v11.45Z"
      />
    </svg>
  );
}

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M4 6h16a2 2 0 0 1 2 2v.4l-10 6.25L2 8.4V8a2 2 0 0 1 2-2Zm16 12H4a2 2 0 0 1-2-2V9.14l9.35 5.84a1.5 1.5 0 0 0 1.6 0L22 9.13V16a2 2 0 0 1-2 2Z"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <Container className="py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2">
              <div className="size-8 rounded-md bg-gradient-to-br from-orange-500/80 to-emerald-500/80 grid place-content-center">
                <span className="text-black font-extrabold">A</span>
              </div>
              <p className="font-bold">{personal.name}</p>
            </div>
            <p className="text-sm text-muted mt-1">
              © {new Date().getFullYear()} {personal.name}. All rights reserved.
            </p>
          </div>

          <nav aria-label="Footer quick links" className="order-2 md:order-none">
            <ul className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <li>
                <a className="hover:text-white text-zinc-300" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-white text-zinc-300" href="#skills">
                  Skills
                </a>
              </li>
              <li>
                <a className="hover:text-white text-zinc-300" href="#projects">
                  Projects
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white text-zinc-300"
                  href="#experience"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white text-zinc-300"
                  href="#certificates"
                >
                  Certificates
                </a>
              </li>
              <li>
                <a className="hover:text-white text-zinc-300" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={personal.social.github}
              aria-label="GitHub"
              className="text-zinc-300 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              <IconGithub className="size-5" />
            </a>
            <a
              href={personal.social.linkedin}
              aria-label="LinkedIn"
              className="text-zinc-300 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              <IconLinkedIn className="size-5" />
            </a>
            <a
              href={`mailto:${personal.social.email}`}
              aria-label="Email"
              className="text-zinc-300 hover:text-white"
            >
              <IconMail className="size-5" />
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-muted mt-6">
          Built with Next.js. Light on dependencies, fast on the web.
        </p>
      </Container>
    </footer>
  );
}
