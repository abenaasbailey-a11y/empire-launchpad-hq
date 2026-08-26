import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Crown, Lock, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoldRule } from "@/components/landing/Section";
import { useEntitlement } from "@/hooks/useEntitlement";
import { getStripeEnvironmentSafe } from "@/lib/stripe";
import { runGrantAssistant } from "@/lib/grant-assistant.functions";

/**
 * Victoria AI Grant Assistant — an Empire Elite feature.
 * Elite+ members get an interactive form; everyone else sees an upgrade CTA.
 * The grant name can be pre-filled when launched from a specific grant card.
 */
export function GrantAssistantPanel({ defaultGrantName = "" }: { defaultGrantName?: string }) {
  const { isElite, isLoading } = useEntitlement();
  const generate = useServerFn(runGrantAssistant);
  const environment = getStripeEnvironmentSafe();

  const [grantName, setGrantName] = useState(defaultGrantName);
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult("");
    try {
      const res = await generate({
        data: { grantName, businessName, businessDescription, environment },
      });
      if (res.error) {
        setError(res.error);
      } else {
        setResult(res.text);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // --- Locked state: not Elite ---
  if (!isLoading && !isElite) {
    return (
      <section className="border-gold/30 bg-card/50 mx-auto max-w-3xl rounded-3xl border p-8 text-center md:p-12">
        <span className="bg-gold/10 text-gold mx-auto flex h-14 w-14 items-center justify-center rounded-full">
          <Crown className="h-6 w-6" />
        </span>
        <p className="eyebrow eyebrow-gold mt-6">Empire Elite feature</p>
        <h2 className="font-display mt-4 text-2xl leading-snug font-light md:text-3xl">
          Victoria AI Grant Assistant
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-sm leading-relaxed">
          Elite members get AI-powered help drafting grant applications — paste your business
          details, and Victoria writes a tailored, compelling application you can refine and submit.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="gold" size="xl" asChild>
            <Link to="/membership">Upgrade to Elite</Link>
          </Button>
          <Button variant="lux" size="xl" asChild>
            <Link to="/join">Start Free</Link>
          </Button>
        </div>
        <p className="text-muted-foreground mt-5 text-[0.7rem] tracking-[0.12em] uppercase">
          Elite · $49.99/mo · Cancel anytime
        </p>
      </section>
    );
  }

  // --- Unlocked state: Elite+ member ---
  return (
    <section className="border-gold/30 bg-card/50 mx-auto max-w-3xl rounded-3xl border p-8 md:p-12">
      <div className="flex items-center gap-3">
        <span className="bg-gold/10 text-gold flex h-11 w-11 items-center justify-center rounded-full">
          <Wand2 className="h-5 w-5" />
        </span>
        <div>
          <p className="eyebrow eyebrow-gold">Empire Elite</p>
          <h2 className="font-display text-2xl leading-snug font-light md:text-3xl">
            Victoria AI Grant Assistant
          </h2>
        </div>
      </div>

      <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
        Tell Victoria about your business and the grant you're applying for. She'll draft a
        complete, tailored application you can edit and submit.
      </p>

      <div className="mt-7 space-y-5">
        <div>
          <label htmlFor="grant-name" className="text-foreground text-xs font-medium tracking-wide uppercase">
            Grant name
          </label>
          <input
            id="grant-name"
            type="text"
            value={grantName}
            onChange={(e) => setGrantName(e.target.value)}
            placeholder="e.g. Amber Grant, IFundWomen, Cartier Women's Initiative"
            className="border-border bg-background/60 focus:border-gold/50 mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="business-name" className="text-foreground text-xs font-medium tracking-wide uppercase">
            Business name <span className="text-muted-foreground normal-case">(optional)</span>
          </label>
          <input
            id="business-name"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Her Empire Era LLC"
            className="border-border bg-background/60 focus:border-gold/50 mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="business-desc" className="text-foreground text-xs font-medium tracking-wide uppercase">
            Tell Victoria about your business
          </label>
          <textarea
            id="business-desc"
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            placeholder="What do you do, who do you serve, what's your traction so far, and how will the grant money help?"
            rows={5}
            className="border-border bg-background/60 focus:border-gold/50 mt-2 w-full resize-y rounded-xl border px-4 py-3 text-sm leading-relaxed outline-none transition-colors"
          />
        </div>
      </div>

      <Button
        variant="gold"
        size="lg"
        className="mt-6 w-full"
        disabled={loading || !grantName.trim() || !businessDescription.trim()}
        onClick={() => void handleGenerate()}
      >
        {loading ? (
          "Victoria is drafting…"
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" /> Draft my application
          </>
        )}
      </Button>

      {error ? (
        <div className="mt-5">
          <p className="text-destructive text-sm leading-relaxed">{error}</p>
          {error.includes("Elite") ? (
            <Button variant="lux" className="mt-4" asChild>
              <Link to="/membership">Upgrade to Elite</Link>
            </Button>
          ) : null}
        </div>
      ) : null}

      {result ? (
        <div className="mt-7">
          <div className="mb-3 flex items-center gap-2">
            <GoldRule />
            <span className="text-gold text-[0.7rem] tracking-[0.16em] uppercase">Your draft</span>
            <GoldRule />
          </div>
          <div className="bg-background/60 border-border/50 max-h-[600px] overflow-y-auto rounded-2xl border p-6">
            <pre className="text-foreground/90 whitespace-pre-wrap text-sm leading-relaxed">
              {result}
            </pre>
          </div>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(result)}
            className="text-muted-foreground hover:text-gold mt-4 text-xs underline transition-colors"
          >
            Copy to clipboard
          </button>
        </div>
      ) : null}

      <p className="text-muted-foreground mt-6 flex items-center gap-1.5 text-[0.7rem] leading-relaxed">
        <Lock className="h-3 w-3 shrink-0" />
        Victoria drafts a starting point. Review and personalise before submitting — you know your
        business best.
      </p>
    </section>
  );
}
