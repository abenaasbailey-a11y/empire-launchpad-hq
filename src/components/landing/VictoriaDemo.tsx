const script = [
  {
    from: "her" as const,
    text: "Victoria, I have 400 new followers from a reel. What do I send them tonight?",
  },
  {
    from: "v" as const,
    text: "Here's a 3-touch welcome sequence in your voice: a warm hello, your signature offer, and a soft close. Want it scheduled for 7:30pm when your audience is most active?",
  },
  { from: "her" as const, text: "Yes. And price my new coaching package." },
  {
    from: "v" as const,
    text: "Based on your results and market, I'd position it at $1,850 with a 3-payment option. I've drafted the sales page headline and objection answers — review inside your dashboard.",
  },
];

export function VictoriaDemo() {
  return (
    <div className="border-border bg-card/70 shadow-[var(--shadow-lux)] relative overflow-hidden rounded-3xl border p-6 md:p-10">
      <div className="border-border flex items-center justify-between border-b pb-5">
        <div className="flex items-center gap-3">
          <span className="bg-gold text-primary-foreground font-display flex h-10 w-10 items-center justify-center rounded-full text-lg">
            V
          </span>
          <div>
            <p className="font-display text-lg leading-none">Victoria</p>
            <p className="text-muted-foreground mt-1 text-xs tracking-[0.2em] uppercase">
              Your private concierge
            </p>
          </div>
        </div>
        <span className="text-primary/80 text-xs tracking-[0.2em] uppercase">Live</span>
      </div>

      <div className="mt-8 space-y-5">
        {script.map((m, i) => (
          <div key={i} className={m.from === "her" ? "flex justify-end" : "flex justify-start"}>
            <p
              className={
                m.from === "her"
                  ? "bg-secondary max-w-[80%] rounded-2xl rounded-br-sm px-5 py-3 text-sm leading-relaxed"
                  : "border-primary/30 bg-primary/5 text-foreground max-w-[85%] rounded-2xl rounded-bl-sm border px-5 py-3 text-sm leading-relaxed"
              }
            >
              {m.text}
            </p>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground mt-8 text-center text-xs tracking-[0.18em] uppercase">
        Sample conversation — yours is trained on your brand
      </p>
    </div>
  );
}