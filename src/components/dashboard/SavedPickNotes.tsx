import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import type { SavedPickNote } from "@/lib/victoria-picks.functions";

const STATUS_LABELS: Record<string, string> = {
  not_started: "Not started",
  saved: "Saved",
  in_progress: "In progress",
  completed: "Completed",
};

const ALL = "All";

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (next: string) => void;
}) {
  if (options.length <= 2) return null;
  return (
    <div className="min-w-0">
      <p className="text-muted-foreground text-[0.62rem] tracking-[0.22em] uppercase">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full border px-3 py-1.5 text-[0.7rem] tracking-[0.1em] uppercase transition-colors ${
              value === option
                ? "border-gold/70 bg-gold/10 text-gold"
                : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
            }`}
          >
            {STATUS_LABELS[option] ?? option}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Victoria's saved "why this fits you" notes with search and
 * skill / category / status / week filters.
 */
export function SavedPickNotes({
  notes,
  isLoading,
}: {
  notes: SavedPickNote[];
  isLoading: boolean;
}) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState(ALL);
  const [category, setCategory] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const [week, setWeek] = useState(ALL);

  const levels = useMemo(
    () => [ALL, ...new Set(notes.map((n) => n.hustle?.level).filter(Boolean) as string[])],
    [notes],
  );
  const categories = useMemo(
    () => [ALL, ...new Set(notes.map((n) => n.hustle?.category).filter(Boolean) as string[])].sort(),
    [notes],
  );
  const statuses = useMemo(() => [ALL, ...new Set(notes.map((n) => n.status))], [notes]);
  const weeks = useMemo(
    () => [ALL, ...[...new Set(notes.map((n) => n.weekKey))].sort().reverse()],
    [notes],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notes.filter((n) => {
      if (level !== ALL && n.hustle?.level !== level) return false;
      if (category !== ALL && n.hustle?.category !== category) return false;
      if (status !== ALL && n.status !== status) return false;
      if (week !== ALL && n.weekKey !== week) return false;
      if (!q) return true;
      return (
        (n.hustle?.title ?? "").toLowerCase().includes(q) ||
        (n.hustle?.category ?? "").toLowerCase().includes(q) ||
        n.note.toLowerCase().includes(q)
      );
    });
  }, [notes, query, level, category, status, week]);

  const filtersActive =
    query.trim() !== "" || level !== ALL || category !== ALL || status !== ALL || week !== ALL;

  function resetFilters() {
    setQuery("");
    setLevel(ALL);
    setCategory(ALL);
    setStatus(ALL);
    setWeek(ALL);
  }

  return (
    <div className="border-border bg-card/50 mt-12 rounded-2xl border p-6 backdrop-blur-sm md:mt-16 md:p-8">
      <p className="eyebrow eyebrow-blush">Saved by Victoria</p>
      <h2 className="font-display mt-4 text-2xl font-light md:text-3xl">Why these ideas fit you</h2>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Every note Victoria has written alongside your weekly picks, kept here for reference.
      </p>

      {isLoading ? (
        <p className="text-muted-foreground mt-6 text-sm">Gathering your notes…</p>
      ) : notes.length === 0 ? (
        <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
          No notes yet.{" "}
          <Link to="/opportunity-center" className="text-gold underline-offset-4 hover:underline">
            Open the Opportunity Center
          </Link>{" "}
          to see this week&apos;s picks from Victoria.
        </p>
      ) : (
        <>
          <div className="mt-7">
            <label htmlFor="notes-search" className="sr-only">
              Search your saved notes
            </label>
            <Input
              id="notes-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search ideas, categories or notes…"
              className="h-12 max-w-md"
            />
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <FilterRow label="Skill level" options={levels} value={level} onChange={setLevel} />
            <FilterRow label="Category" options={categories} value={category} onChange={setCategory} />
            <FilterRow label="Status" options={statuses} value={status} onChange={setStatus} />
            <FilterRow label="Week" options={weeks} value={week} onChange={setWeek} />
          </div>

          <div className="border-border/60 mt-7 flex flex-wrap items-center justify-between gap-3 border-t pt-5">
            <p className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
              {filtered.length} of {notes.length} notes
            </p>
            {filtersActive && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-gold text-xs tracking-[0.14em] uppercase underline-offset-4 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              Nothing matches those filters yet. Try a broader search.
            </p>
          ) : (
            <ul className="mt-6 space-y-5">
              {filtered.map((entry) => (
                <li
                  key={entry.id}
                  className="border-border/60 border-t pt-5 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-lg font-light">
                      {entry.hustle?.title ?? "Saved idea"}
                    </h3>
                    <span className="text-muted-foreground text-[0.7rem] tracking-[0.18em] uppercase">
                      {entry.weekKey}
                      {entry.hustle?.category ? ` · ${entry.hustle.category}` : ""}
                      {entry.hustle?.level ? ` · ${entry.hustle.level}` : ""}
                      {` · ${STATUS_LABELS[entry.status] ?? entry.status}`}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed italic">
                    “{entry.note}”
                  </p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
