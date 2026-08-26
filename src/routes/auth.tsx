import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { GoldRule } from "@/components/landing/Section";
import { trackSignup } from "@/lib/analytics";

const TITLE = "Create Your Free Her Empire Era Membership";
const DESCRIPTION =
  "Create your free Her Empire Era account and meet Victoria, your private AI business concierge. No card required.";

const searchSchema = z.object({
  email: z.string().optional(),
  mode: z.enum(["signup", "signin"]).optional(),
  next: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: (search) => searchSchema.parse(search),
  component: AuthPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const credentials = z.object({
  email: z.string().trim().email("Enter a valid email address").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
  fullName: z.string().trim().max(120).optional(),
});

// Only same-origin relative paths may be used as a post-login destination.
function safeNext(next: string | undefined): string | null {
  if (!next) return null;
  if (!next.startsWith("/") || next.startsWith("//")) return null;
  return next;
}

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const next = safeNext(search.next);
  const [mode, setMode] = useState<"signup" | "signin">(search.mode ?? "signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(search.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (!active || !data.session) return;
      if (next) {
        window.location.replace(next);
        return;
      }
      void navigate({ to: "/dashboard", replace: true });
    });
    return () => {
      active = false;
    };
  }, [navigate, next]);

  function goAfterAuth(signup = false) {
    if (next) {
      window.location.replace(next);
      return;
    }
    // New signups land on the branded welcome page; returning sign-ins go
    // straight to the dashboard.
    void navigate({ to: signup ? "/welcome" : "/dashboard", replace: true });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const parsed = credentials.safeParse({ email, password, fullName });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }

    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}${next ?? "/dashboard"}`,
            data: { full_name: parsed.data.fullName || null },
          },
        });
        if (signUpError) {
          const message = signUpError.message.toLowerCase();
          if (message.includes("already registered") || message.includes("already been registered")) {
            setMode("signin");
            setError("You already have a membership with this email — sign in below.");
            return;
          }
          setError(signUpError.message);
          return;
        }
        if (data.session) {
          trackSignup("email");
          goAfterAuth();
          return;
        }
        // Signups are auto-confirmed, so sign the new member straight in.
        const { error: autoSignInError } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (autoSignInError) {
          setNotice(
            `Almost there — check ${parsed.data.email} and confirm your email to open your dashboard.`,
          );
          return;
        }
        trackSignup("email");
        goAfterAuth();
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (signInError) {
          setError(signInError.message);
          return;
        }
        goAfterAuth();
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setBusy(true);
    if (mode === "signup") trackSignup("google");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: next
        ? `${window.location.origin}/auth?next=${encodeURIComponent(next)}`
        : window.location.origin,
    });
    if (result.error) {
      setError("Google sign-in could not be completed. Please try again.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    goAfterAuth();
  }

  return (
    <main className="flex min-h-[100svh] items-center justify-center px-5 py-16 md:px-10">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="font-display text-muted-foreground hover:text-primary text-sm tracking-[0.22em] uppercase transition-colors"
        >
          Her Empire Era
        </Link>
        <h1 className="font-display heading-glow mt-6 text-4xl leading-[1.1] font-light md:text-5xl">
          {mode === "signup" ? "Create your free membership" : "Welcome back"}
        </h1>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          {mode === "signup"
            ? "Meet Victoria, your private AI business concierge. No card required."
            : "Sign in to your membership and pick up where you left off."}
        </p>
        <GoldRule className="mt-6" />

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {mode === "signup" ? (
            <div>
              <label htmlFor="fullName" className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                Your name
              </label>
              <input
                id="fullName"
                name="name"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border-input bg-card/60 text-foreground focus:ring-ring mt-2 h-13 w-full rounded-xl border px-4 text-base outline-none focus:ring-1"
              />
            </div>
          ) : null}

          <div>
            <label htmlFor="email" className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-input bg-card/60 text-foreground focus:ring-ring mt-2 h-13 w-full rounded-xl border px-4 text-base outline-none focus:ring-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-input bg-card/60 text-foreground focus:ring-ring mt-2 h-13 w-full rounded-xl border px-4 text-base outline-none focus:ring-1"
            />
          </div>

          {error ? <p className="text-destructive text-sm">{error}</p> : null}
          {notice ? <p className="text-primary text-sm">{notice}</p> : null}

          <Button type="submit" variant="gold" size="xl" className="w-full" disabled={busy}>
            {mode === "signup" ? "Start Free" : "Sign In"}
          </Button>
        </form>

        <div className="text-muted-foreground my-6 flex items-center gap-4 text-[0.65rem] tracking-[0.24em] uppercase">
          <span className="bg-border h-px flex-1" />
          or
          <span className="bg-border h-px flex-1" />
        </div>

        <Button
          type="button"
          variant="lux"
          size="xl"
          className="w-full"
          onClick={handleGoogle}
          disabled={busy}
        >
          Continue with Google
        </Button>

        <p className="text-muted-foreground mt-8 text-center text-sm">
          {mode === "signup" ? "Already a member?" : "New here?"}{" "}
          <button
            type="button"
            className="text-primary underline-offset-4 hover:underline"
            onClick={() => {
              setMode(mode === "signup" ? "signin" : "signup");
              setError(null);
              setNotice(null);
            }}
          >
            {mode === "signup" ? "Sign in" : "Create a free account"}
          </button>
        </p>
      </div>
    </main>
  );
}
