import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { trackStartFreeClick } from "@/lib/analytics";

/** Shared luxury header used by SEO content pages. */
export function SiteHeader({ ctaLocation }: { ctaLocation: string }) {
  return (
    <header className="border-border/60 bg-background/85 fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3.5 md:px-10 md:py-4">
        <Link
          to="/join"
          className="font-display text-sm tracking-[0.18em] uppercase sm:text-lg sm:tracking-[0.22em]"
        >
          Her Empire <span className="text-gold">Era</span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/membership"
            className="text-gold hover:text-gold/80 text-[0.65rem] tracking-[0.2em] uppercase transition-colors"
          >
            Membership
          </Link>
          <Button variant="lux" size="sm" asChild>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              onClick={() => trackStartFreeClick(ctaLocation)}
            >
              Start Free
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

/** Shared luxury footer used by SEO content pages. */
export function SiteFooter() {
  return (
    <footer className="border-border/60 border-t px-5 py-10 md:px-10">
      <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-[0.65rem] tracking-[0.18em] uppercase sm:flex-row sm:text-xs">
        <p className="font-display text-sm tracking-[0.22em]">Her Empire Era</p>
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <Link to="/membership" className="hover:text-blush transition-colors">
            Membership
          </Link>
          <Link to="/services" className="hover:text-blush transition-colors">
            Services
          </Link>
          <Link to="/blog" className="hover:text-blush transition-colors">
            Journal
          </Link>
          <Link to="/faq" className="hover:text-blush transition-colors">
            FAQ
          </Link>
          <Link to="/press" className="hover:text-blush transition-colors">
            Press
          </Link>
          <Link to="/privacy" className="hover:text-blush transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-blush transition-colors">
            Terms
          </Link>
          <Link to="/refunds" className="hover:text-blush transition-colors">
            Refunds
          </Link>
        </nav>
        <p>herempireera.com</p>
      </div>
    </footer>
  );
}
