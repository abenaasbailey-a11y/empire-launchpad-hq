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
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 font-display text-4xl leading-[1.1] font-light md:text-5xl">{title}</h2>
      {lead ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{lead}</p>
      ) : null}
    </div>
  );
}

export function GoldRule({ className }: { className?: string }) {
  return <div className={cn("bg-gold h-px w-16 opacity-80", className)} />;
}