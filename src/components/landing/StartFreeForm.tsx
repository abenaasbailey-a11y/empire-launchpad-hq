import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function StartFreeForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = email.trim();
        // Carry the email into the registration page so it is pre-filled there.
        void navigate({
          to: "/auth",
          search: trimmed ? { email: trimmed, mode: "signup" } : { mode: "signup" },
        });
      }}
      className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <label className="sr-only" htmlFor="email">
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
        placeholder="your@email.com"
        className="border-input bg-card/60 text-foreground placeholder:text-muted-foreground focus:ring-ring h-14 w-full flex-1 rounded-full border px-6 text-base outline-none focus:ring-1 sm:text-sm"
      />
      <Button type="submit" variant="gold" size="xl" className="w-full sm:w-auto">
        Start Free
      </Button>
    </form>
  );
}