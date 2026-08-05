import { useState } from "react";
import { Button } from "@/components/ui/button";

export function StartFreeForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="text-primary font-display text-2xl">
        Welcome to the Era. Check {email} for your access link.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
      className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <label className="sr-only" htmlFor="email">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="border-input bg-card/60 text-foreground placeholder:text-muted-foreground focus:ring-ring h-14 flex-1 rounded-full border px-6 text-sm outline-none focus:ring-1"
      />
      <Button type="submit" variant="gold" size="xl">
        Start Free
      </Button>
    </form>
  );
}