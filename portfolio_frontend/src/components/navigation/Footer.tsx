import Container from "../ui/Container";
import { personal } from "@/data/personal";

/**
 * PUBLIC_INTERFACE
 * Footer component: simplified to display only centered brand/name and copyright.
 * Removes navigation and social links for a clean minimal footer.
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24" role="contentinfo">
      <Container className="py-10">
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <div className="inline-flex items-center gap-2" aria-label="Brand">
            <div className="size-8 rounded-md bg-gradient-to-br from-orange-500/80 to-emerald-500/80 grid place-content-center">
              <span className="text-black font-extrabold">A</span>
            </div>
            <p className="font-bold">{personal.name}</p>
          </div>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
