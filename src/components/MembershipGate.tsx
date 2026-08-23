import { Link } from "@tanstack/react-router";
import { Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEntitlement } from "@/hooks/useEntitlement";

/**
 * Upgrade prompt shown to free accounts. Cosmetic only — the Prompt Vault rows,
 * AI runs and Victoria picks are all restricted server-side as well.
 */
export function MembershipGate({
  title = "You're seeing the free samples",
  body = "Members unlock all 56+ prompts, unlimited Empire Builder AI runs and Victoria's weekly picks.",
  className = "",
}: {
  title?: string;
  body?: string;
  className?: string;
}) {
  const { isLoading, isMember, remaining, limit } = useEntitlement();

  if (isLoading || isMember) return null;

  return (
    <div
      className={`border-gold/30 bg-gold/5 rounded-2xl border p-6 backdrop-blur-sm md:p-8 ${className}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="text-gold flex items-center gap-2 text-[0.65rem] tracking-[0.22em] uppercase">
            <Crown className="h-3.5 w-3.5" /> Membership
          </p>
          <h3 className="font-display mt-3 text-xl font-light md:text-2xl">{title}</h3>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">{body}</p>
          {limit !== null ? (
            <p className="text-muted-foreground mt-3 flex items-center gap-1.5 text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              {remaining ?? 0} of {limit} free AI runs left this month
            </p>
          ) : null}
        </div>
        <Button variant="gold" asChild>
          <Link to="/membership">Become a member — $19/mo</Link>
        </Button>
      </div>
    </div>
  );
}
