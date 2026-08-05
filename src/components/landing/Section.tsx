import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("px-6 py-24 md:px-10 md:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  glow = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "center" | "left";
  glow?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow eyebrow-blush">{eyebrow}</p>
      <h2
        className={cn(
          "font-display mt-5 text-[2rem] leading-[1.12] font-light md:text-5xl md:leading-[1.1]",
          glow && "heading-glow",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className="text-muted-foreground mt-5 text-[0.95rem] leading-relaxed md:text-base">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export function GoldRule({ className }: { className?: string }) {
  return <div className={cn("bg-gold h-px w-16 opacity-80", className)} />;
}

export function BlushRule({ className }: { className?: string }) {
  return <div className={cn("bg-blush-line h-px w-16", className)} />;
}