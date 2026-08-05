import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { GoldRule, Section } from "@/components/landing/Section";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Your Membership Dashboard — Her Empire Era" },
      {
        name: "description",
        content: "Your Her Empire Era membership home, with Victoria your AI business concierge.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const startHere = [
  {
    title: "Tell Victoria about your business",
    body: "Share your offer, your audience and your goals so every draft sounds like you.",
  },
  {
    title: "Set your prices",
    body: "Get positioning and payment plans built from your results and your market.",
  },
  {
    title: "Plan your week",
    body: "Three revenue-moving priorities, ready before you open your laptop.",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();
      return { email: user.email ?? "", fullName: data?.full_name ?? "" };
    },
  });

  const firstName = profile?.fullName?.split(" ")[0];

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }

  return (
    <main>
      <header className="border-border/60 border-b">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-4 md:px-10">
          <span className="font-display text-sm tracking-[0.18em] uppercase sm:text-lg sm:tracking-[0.22em]">
            Her Empire <span className="text-gold">Era</span>
          </span>
          <Button variant="lux" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </header>

      <Section>
        <p className="eyebrow eyebrow-blush">Member dashboard</p>
        <h1 className="font-display heading-glow mt-5 max-w-3xl text-4xl leading-[1.08] font-light md:text-6xl">
          Welcome{firstName ? `, ${firstName}` : ""}. Your era starts here.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-[0.95rem] leading-relaxed">
          Your free membership is active{profile?.email ? ` for ${profile.email}` : ""}. Victoria is
          ready whenever you are.
        </p>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {startHere.map((item) => (
            <article
              key={item.title}
              className="border-border bg-card/50 rounded-2xl border p-6 backdrop-blur-sm md:p-8"
            >
              <GoldRule />
              <h2 className="font-display mt-6 text-2xl font-light">{item.title}</h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}