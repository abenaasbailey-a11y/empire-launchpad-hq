import { createFileRoute, Link, stripSearchParams, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { queryOptions, useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Heart, Lock, Search, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BlushRule, GoldRule, Section, SectionHeading } from "@/components/landing/Section";
import { listSideHustles, type SideHustle } from "@/lib/opportunities.functions";
import { getWeeklyPicks } from "@/lib/victoria-picks.functions";
import { cn } from "@/lib/utils";

const TITLE = "Empire Opportunity Center — 200+ AI Side Hustles";
const DESCRIPTION =
  "Browse a searchable library of AI-powered business ideas for women entrepreneurs: filter by level and category, save favourites and track your progress.";
const OG_IMAGE = "https://yourempireconcierge.com/og-image.jpg";

const PICK_DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

function formatPickDate(iso: string): string {
  return PICK_DATE_FORMAT.format(new Date(iso));
}

const hustlesQuery = queryOptions({
  queryKey: ["side-hustles"],
  queryFn: () => listSideHustles(),
  staleTime: 5 * 60_000,
});

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "All").default("All"),
  level: fallback(z.string(), "All").default("All"),
  view: fallback(z.string(), "all").default("all"),
});

export const Route = createFileRoute("/opportunity-center")({
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [stripSearchParams({ q: "", category: "All", level: "All", view: "all" })],
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(hustlesQuery),
  component: OpportunityCenter,
  errorComponent: ({ error }) => (
    <Section>
      <p role="alert" className="text-muted-foreground text-sm">
        The Opportunity Center could not load right now. {error.message}
      </p>
    </Section>
  ),
  notFoundComponent: () => (
    <Section>
      <p className="text-muted-foreground text-sm">No opportunities found.</p>
    </Section>
  ),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://yourempireconcierge.com/opportunity-center" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://yourempireconcierge.com/opportunity-center" }],
  }),
});

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
const STATUSES = [
  { value: "saved", label: "Saved" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

interface MemberRow {
  side_hustle_id: string;
  is_favorite: boolean;
  status: string;
}

function OpportunityCenter() {
  const { data: hustles } = useSuspenseQuery(hustlesQuery);
  const { q, category, level, view } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const queryClient = useQueryClient();

  const { data: session } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user?.id ?? null;
    },
  });
  const isMember = Boolean(session);

  const { data: memberRows } = useQuery({
    queryKey: ["member-side-hustles", session],
    enabled: isMember,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("member_side_hustles")
        .select("side_hustle_id, is_favorite, status");
      if (error) throw new Error(error.message);
      return (data ?? []) as MemberRow[];
    },
  });

  const rowFor = (id: string) => memberRows?.find((r) => r.side_hustle_id === id);

  const upsert = useMutation({
    mutationFn: async (input: { id: string; is_favorite?: boolean; status?: string }) => {
      if (!session) throw new Error("Sign in to save ideas");
      const existing = rowFor(input.id);
      const { error } = await supabase.from("member_side_hustles").upsert(
        {
          user_id: session,
          side_hustle_id: input.id,
          is_favorite: input.is_favorite ?? existing?.is_favorite ?? false,
          status: input.status ?? existing?.status ?? "saved",
        },
        { onConflict: "user_id,side_hustle_id" },
      );
      if (error) throw new Error(error.message);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["member-side-hustles"] }),
  });

  const categories = ["All", ...Array.from(new Set(hustles.map((h) => h.category))).sort()];

  const term = q.trim().toLowerCase().slice(0, 100);
  const visible = hustles.filter((h) => {
    if (category !== "All" && h.category !== category) return false;
    if (level !== "All" && h.level !== level) return false;
    if (view === "favorites" && !rowFor(h.id)?.is_favorite) return false;
    if (!term) return true;
    return (
      h.title.toLowerCase().includes(term) ||
      h.summary.toLowerCase().includes(term) ||
      h.category.toLowerCase().includes(term) ||
      h.tools.join(" ").toLowerCase().includes(term)
    );
  });

  const completed = memberRows?.filter((r) => r.status === "completed").length ?? 0;
  const inProgress = memberRows?.filter((r) => r.status === "in_progress").length ?? 0;
  const favorites = memberRows?.filter((r) => r.is_favorite).length ?? 0;

  function setSearch(patch: Partial<{ q: string; category: string; level: string; view: string }>) {
    void navigate({
      search: (prev: Record<string, unknown>) => ({ ...prev, ...patch }),
    });
  }

  return (
    <main>
      <header className="border-border/60 bg-background/85 sticky top-0 z-50 w-full border-b backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3.5 md:px-10 md:py-4">
          <Link
            to="/"
            className="font-display text-sm tracking-[0.18em] uppercase sm:text-lg sm:tracking-[0.22em]"
          >
            Her Empire <span className="text-gold">Era</span>
          </Link>
          {isMember ? (
            <Button variant="lux" size="sm" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button variant="lux" size="sm" asChild>
              <Link to="/auth" search={{ mode: "signup" }}>
                Start Free
              </Link>
            </Button>
          )}
        </div>
      </header>

      <Section className="pb-10 md:pb-14">
        <p className="eyebrow eyebrow-blush">Empire Opportunity Center</p>
        <h1 className="font-display heading-glow mt-5 max-w-3xl text-[2.5rem] leading-[1.06] font-light md:text-6xl md:leading-[1.04]">
          200+ AI side hustles you could start this week.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl text-[0.95rem] leading-relaxed md:text-base">
          A curated library of AI-powered business ideas — searchable by category and level, with the
          tools and first steps for each one. Save your favourites and track what you have started.
        </p>

        {isMember ? (
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { label: "Favourites", value: favorites },
              { label: "In progress", value: inProgress },
              { label: "Completed", value: completed },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-gold text-3xl">{stat.value}</p>
                <p className="text-muted-foreground text-[0.65rem] tracking-[0.2em] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="border-blush/40 bg-blush-wash text-muted-foreground mt-8 inline-flex max-w-xl items-start gap-3 rounded-2xl border px-5 py-4 text-sm leading-relaxed">
            <Sparkles className="text-blush mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              You are previewing {hustles.filter((h) => h.is_free_preview).length} ideas.{" "}
              <Link to="/auth" search={{ mode: "signup" }} className="text-gold underline">
                Create your free membership
              </Link>{" "}
              to unlock the full library, save favourites and track your progress.
            </span>
          </p>
        )}
      </Section>

      {isMember && <VictoriaPicks />}

      <Section className="border-border/60 border-y py-8 md:py-10">
        <div className="flex flex-col gap-5">
          <div className="relative">
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-5 size-4 -translate-y-1/2"
              aria-hidden="true"
            />
            <label className="sr-only" htmlFor="opportunity-search">
              Search opportunities
            </label>
            <input
              id="opportunity-search"
              type="search"
              value={q}
              onChange={(e) => setSearch({ q: e.target.value })}
              placeholder="Search ideas, tools or categories…"
              className="border-input bg-card/60 text-foreground placeholder:text-muted-foreground focus:ring-ring h-13 w-full rounded-full border pr-6 pl-12 text-base outline-none focus:ring-1 sm:text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setSearch({ level: l })}
                className={cn(
                  "rounded-full border px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase transition-colors",
                  level === l
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:text-blush",
                )}
              >
                {l}
              </button>
            ))}
            {isMember && (
              <button
                type="button"
                onClick={() => setSearch({ view: view === "favorites" ? "all" : "favorites" })}
                className={cn(
                  "ml-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase transition-colors",
                  view === "favorites"
                    ? "border-blush text-blush bg-blush-wash"
                    : "border-border text-muted-foreground hover:text-blush",
                )}
              >
                <Heart className="size-3.5" aria-hidden="true" /> Favourites
              </button>
            )}
          </div>

          <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSearch({ category: c })}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-xs transition-colors",
                  category === c
                    ? "bg-blush/20 text-blush"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <p className="text-muted-foreground text-[0.7rem] tracking-[0.2em] uppercase">
          {visible.length} {visible.length === 1 ? "opportunity" : "opportunities"}
        </p>

        {visible.length === 0 ? (
          <p className="text-muted-foreground mt-8 text-sm">
            Nothing matches those filters yet. Try a broader search.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
            {visible.map((h) => (
              <OpportunityCard
                key={h.id}
                hustle={h}
                locked={!isMember && !h.is_free_preview}
                interactive={isMember}
                row={rowFor(h.id)}
                onFavorite={() =>
                  upsert.mutate({ id: h.id, is_favorite: !rowFor(h.id)?.is_favorite })
                }
                onStatus={(status) => upsert.mutate({ id: h.id, status })}
              />
            ))}
          </div>
        )}
      </Section>

      {!isMember && (
        <Section className="bg-blush-wash text-center">
          <p className="eyebrow eyebrow-blush">Free membership</p>
          <h2 className="font-display heading-glow mx-auto mt-5 max-w-3xl text-[2rem] leading-[1.1] font-light md:text-5xl">
            Unlock the full library and start one this week.
          </h2>
          <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed">
            Create your free account to open every opportunity, save favourites and let Victoria
            build the launch plan for the one you choose.
          </p>
          <div className="mt-9">
            <Button variant="gold" size="xl" asChild>
              <Link to="/auth" search={{ mode: "signup" }}>
                Start Free
              </Link>
            </Button>
          </div>
        </Section>
      )}

      <footer className="border-border/60 border-t px-5 py-10 md:px-10">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-[0.65rem] tracking-[0.18em] uppercase sm:flex-row sm:text-xs">
          <p className="font-display text-sm tracking-[0.22em]">Her Empire Era</p>
          <nav className="flex items-center gap-5">
            <Link to="/" className="hover:text-blush transition-colors">
              Home
            </Link>
            <Link to="/privacy" className="hover:text-blush transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-blush transition-colors">
              Terms
            </Link>
          </nav>
          <p>yourempireconcierge.com</p>
        </div>
      </footer>
    </main>
  );
}

function OpportunityCard({
  hustle,
  locked,
  interactive,
  row,
  onFavorite,
  onStatus,
}: {
  hustle: SideHustle;
  locked: boolean;
  interactive: boolean;
  row: MemberRow | undefined;
  onFavorite: () => void;
  onStatus: (status: string) => void;
}) {
  return (
    <article className="border-border bg-card/50 relative flex h-full flex-col rounded-2xl border p-6 backdrop-blur-sm md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-blush text-[0.65rem] tracking-[0.2em] uppercase">{hustle.category}</p>
          <h2 className="font-display mt-3 text-2xl leading-snug font-light">{hustle.title}</h2>
        </div>
        {interactive && (
          <button
            type="button"
            onClick={onFavorite}
            aria-label={row?.is_favorite ? "Remove from favourites" : "Save to favourites"}
            aria-pressed={row?.is_favorite ?? false}
            className="text-muted-foreground hover:text-blush shrink-0 transition-colors"
          >
            <Heart className={cn("size-5", row?.is_favorite && "fill-current text-blush")} />
          </button>
        )}
      </div>

      <GoldRule className="mt-5" />

      {locked ? (
        <div className="mt-6 flex flex-1 flex-col justify-between gap-6">
          <p className="text-muted-foreground text-sm leading-relaxed blur-[3px] select-none">
            {hustle.summary}
          </p>
          <div className="border-border/60 flex items-center justify-between gap-4 rounded-xl border px-4 py-3">
            <span className="text-muted-foreground inline-flex items-center gap-2 text-xs">
              <Lock className="size-3.5" aria-hidden="true" /> Member idea
            </span>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              className="text-gold text-[0.7rem] tracking-[0.18em] uppercase"
            >
              Unlock free
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex flex-1 flex-col">
          <p className="text-muted-foreground text-sm leading-relaxed">{hustle.summary}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground text-[0.65rem] tracking-[0.18em] uppercase">
                Level
              </dt>
              <dd className="mt-1">{hustle.level}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-[0.65rem] tracking-[0.18em] uppercase">
                Potential
              </dt>
              <dd className="text-gold mt-1">{hustle.earning_potential}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-[0.65rem] tracking-[0.18em] uppercase">
                Startup cost
              </dt>
              <dd className="mt-1">{hustle.startup_cost}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-[0.65rem] tracking-[0.18em] uppercase">
                Tools
              </dt>
              <dd className="mt-1">{hustle.tools.join(", ")}</dd>
            </div>
          </dl>

          <details className="group border-border mt-6 border-t pt-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm [&::-webkit-details-marker]:hidden">
              First steps
              <span
                className="text-blush shrink-0 leading-none transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <ol className="text-muted-foreground mt-4 space-y-2 text-sm leading-relaxed">
              {hustle.first_steps.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="text-gold font-display">{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </details>

          {interactive ? (
            <div className="mt-auto pt-6">
              <BlushRule className="w-10" />
              <div className="mt-4 flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => onStatus(s.value)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-[0.65rem] tracking-[0.16em] uppercase transition-colors",
                      row?.status === s.value
                        ? "border-primary text-primary bg-primary/10"
                        : "border-border text-muted-foreground hover:text-blush",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </article>
  );
}

function VictoriaPicks() {
  const fetchPicks = useServerFn(getWeeklyPicks);
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["victoria-weekly-picks"],
    queryFn: () => fetchPicks(),
    staleTime: 60 * 60_000,
  });

  // Rotate automatically the moment the 7-day window closes, without a reload.
  useEffect(() => {
    if (!data?.refreshAt) return;
    const delay = new Date(data.refreshAt).getTime() - Date.now();
    const timer = window.setTimeout(() => void refetch(), Math.max(delay, 1_000));
    return () => window.clearTimeout(timer);
  }, [data?.refreshAt, refetch]);

  const dateLabel = data
    ? `${formatPickDate(data.startsAt)} – ${formatPickDate(data.endsAt)}`
    : null;

  if (isError) return null;

  return (
    <Section className="bg-blush-wash">
      <p className="eyebrow eyebrow-blush">Victoria&rsquo;s picks · this week</p>
      {dateLabel ? (
        <p className="text-muted-foreground mt-3 text-[0.7rem] tracking-[0.18em] uppercase">
          <span className="text-gold">This week</span> · {dateLabel}
        </p>
      ) : null}
      <h2 className="font-display heading-glow mt-5 max-w-3xl text-[2rem] leading-[1.1] font-light md:text-4xl">
        Chosen for you from what you have saved and started.
      </h2>
      <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed">
        Victoria reads your favourites and your progress, then hand-picks three fresh
        opportunities every week. New selections arrive each Monday.
      </p>

      {isPending ? (
        <div className="mt-9 grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="border-border bg-card/50 h-52 animate-pulse rounded-2xl border"
              aria-hidden="true"
            />
          ))}
        </div>
      ) : data && data.picks.length > 0 ? (
        <div className="mt-9 grid gap-6 md:grid-cols-3 md:gap-8">
          {data.picks.map((pick) => (
            <article
              key={pick.id}
              className="border-border bg-card/60 flex h-full flex-col rounded-2xl border p-6 backdrop-blur-sm md:p-7"
            >
              <p className="text-blush text-[0.65rem] tracking-[0.2em] uppercase">{pick.category}</p>
              <h3 className="font-display mt-3 text-xl leading-snug font-light">{pick.title}</h3>
              <BlushRule className="mt-4 w-10" />
              <p className="text-muted-foreground mt-4 flex-1 text-sm leading-relaxed italic">
                &ldquo;{pick.note}&rdquo;
              </p>
              <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                <div>
                  <dt className="text-muted-foreground text-[0.6rem] tracking-[0.18em] uppercase">
                    Level
                  </dt>
                  <dd className="mt-1">{pick.level}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-[0.6rem] tracking-[0.18em] uppercase">
                    Potential
                  </dt>
                  <dd className="text-gold mt-1">{pick.earning_potential}</dd>
                </div>
              </dl>
              <Link
                to="/opportunity-center"
                search={{ q: pick.title, category: "All", level: "All", view: "all" }}
                className="text-gold mt-6 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase"
              >
                See the full plan <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-9 text-sm">
          Save a few favourites below and Victoria will start tailoring next week&rsquo;s picks to
          you.
        </p>
      )}
    </Section>
  );
}
