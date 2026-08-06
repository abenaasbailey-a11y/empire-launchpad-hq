import { useEffect, useRef, useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

const scenarios = [
  {
    id: "launch",
    label: "Launch",
    prompt: "Viral reel → launch plan",
    script: [
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
    ],
  },
  {
    id: "content",
    label: "Content",
    prompt: "Content calendar in your voice",
    script: [
      {
        from: "her" as const,
        text: "I need a full week of content but I only have 20 minutes.",
      },
      {
        from: "v" as const,
        text: "Done. 5 posts, 3 stories, and 1 email — all drafted in your voice, hooked to your offer, and scheduled by channel. Want me to adapt them for LinkedIn too?",
      },
      { from: "her" as const, text: "Yes, and add a soft CTA to the email." },
      {
        from: "v" as const,
        text: "Updated. The email now closes with a limited-spots invitation and a reply prompt. Everything is saved in your Content Studio.",
      },
    ],
  },
  {
    id: "grant",
    label: "Grant",
    prompt: "Grant narrative overnight",
    script: [
      {
        from: "her" as const,
        text: "I found a grant for women founders. Can you help me apply by Friday?",
      },
      {
        from: "v" as const,
        text: "I pulled the eligibility checklist and drafted your executive summary, budget narrative, and impact statement. The deadline is Friday at 5pm — want a day-by-day completion plan?",
      },
      { from: "her" as const, text: "Send the plan and flag any weak spots." },
      {
        from: "v" as const,
        text: "Plan sent. One section needs revenue proof — I noted exactly what document to attach and where. You're 80% finished already.",
      },
    ],
  },
];

export function VictoriaDemo() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const activeScenario = scenarios.find((s) => s.id === activeId)!;
  const script = activeScenario.script;

  const [visibleCount, setVisibleCount] = useState(1);
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [key, setKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Reset animation when scenario changes or replay is clicked.
  useEffect(() => {
    setVisibleCount(1);
    setTypingIndex(0);
    setDisplayedText("");
    setIsPaused(false);
  }, [activeId, key]);

  // Type out the current message.
  useEffect(() => {
    if (isPaused) return;
    const currentMessage = activeScenario.script[typingIndex];
    if (!currentMessage) return;

    if (displayedText.length < currentMessage.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentMessage.text.slice(0, displayedText.length + 1));
      }, 18);
      return () => clearTimeout(timeout);
    }

    // Finished typing this message; pause, then show next.
    const pause = setTimeout(() => {
      if (typingIndex < activeScenario.script.length - 1) {
        setTypingIndex((i) => i + 1);
        setDisplayedText("");
        setVisibleCount((c) => c + 1);
      } else {
        setIsPaused(true);
      }
    }, 900);
    return () => clearTimeout(pause);
  }, [activeScenario, typingIndex, displayedText, isPaused]);

  // Auto-scroll as new messages appear.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [displayedText, visibleCount]);

  function handleReplay() {
    setKey((k) => k + 1);
  }

  return (
    <div className="border-border bg-card/70 shadow-[var(--shadow-lux)] relative overflow-hidden rounded-3xl border">
      {/* Header */}
      <div className="border-border flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex items-center gap-3">
          <span className="bg-gold text-primary-foreground font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg">
            V
          </span>
          <div>
            <p className="font-display text-lg leading-none">Victoria</p>
            <p className="text-muted-foreground mt-1 text-xs tracking-[0.2em] uppercase">
              Your private concierge
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setActiveId(scenario.id)}
              className={`rounded-full px-3.5 py-1.5 text-[0.65rem] tracking-[0.18em] uppercase transition-all ${
                activeId === scenario.id
                  ? "border-gold/70 bg-gold/10 text-gold border"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              }`}
              aria-pressed={activeId === scenario.id}
            >
              {scenario.label}
            </button>
          ))}
          <button
            type="button"
            onClick={handleReplay}
            className="text-muted-foreground hover:text-gold ml-1 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
            aria-label="Replay conversation"
            title="Replay conversation"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Scenario caption */}
      <div className="bg-secondary/30 border-border flex items-center gap-2 border-b px-6 py-2.5 md:px-8">
        <Sparkles className="text-gold h-3.5 w-3.5" />
        <p className="text-muted-foreground text-[0.7rem] tracking-[0.16em] uppercase">
          {activeScenario.prompt}
        </p>
      </div>

      {/* Messages */}
      <div ref={containerRef} className="max-h-[420px] space-y-5 overflow-y-auto p-6 md:max-h-[480px] md:p-8">
        {activeScenario.script.map((m, i) => {
          const isVisible = i < visibleCount;
          const isTyping = isVisible && i === typingIndex && !isPaused;
          const text = isVisible ? (i === typingIndex ? displayedText : m.text) : "";

          return (
            <div
              key={`${activeId}-${i}`}
              className={m.from === "her" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={
                  m.from === "her"
                    ? "bg-secondary max-w-[85%] rounded-2xl rounded-br-sm px-5 py-3.5 text-sm leading-relaxed md:max-w-[75%]"
                    : "border-primary/30 bg-primary/5 text-foreground max-w-[90%] rounded-2xl rounded-bl-sm border px-5 py-3.5 text-sm leading-relaxed md:max-w-[80%]"
                }
              >
                <p>{text}</p>
                {isTyping && (
                  <span className="text-gold ml-0.5 inline-block h-3 w-1.5 animate-pulse align-middle">
                    |
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-border flex items-center justify-between border-t px-6 py-4 md:px-8">
        <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
          Sample conversation — yours is trained on your brand
        </p>
        <span className="bg-gold/10 text-gold flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6rem] tracking-[0.16em] uppercase">
          <span className="bg-gold h-1.5 w-1.5 animate-pulse rounded-full" />
          Live demo
        </span>
      </div>
    </div>
  );
}
