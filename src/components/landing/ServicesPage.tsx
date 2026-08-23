import { useState } from "react";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BlushRule, GoldRule, Section, SectionHeading } from "@/components/landing/Section";
import {
  FileText,
  Mail,
  Megaphone,
  Sparkles,
  Check,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { captureServiceRequest, servicesList } from "@/lib/service-requests.functions";

const services: Array<{
  icon: typeof Landmark;
  title: string;
  price: string;
  priceId: string | null;
  body: string;
  deliverables: string[];
  turnaround: string;
  featured: boolean;
}> = [
  {
    icon: FileText,
    title: "Business Plan",
    price: "$300",
    priceId: "business_plan_onetime",
    body: "Investor-ready business plans with executive summary, market analysis, financial projections, and growth strategy — built with AI, polished by a real strategist.",
    deliverables: ["Executive summary", "Market analysis", "Financial projections", "Growth strategy"],
    turnaround: "4 – 6 days",
    featured: true,
  },
  {
    icon: Sparkles,
    title: "Résumé & Cover Letter Makeover",
    price: "$75",
    priceId: "resume_makeover_onetime",
    body: "A complete rewrite of your résumé and cover letter, optimized for ATS systems and written to get you noticed — whether for a job, a board seat, or a grant committee.",
    deliverables: ["ATS-optimized résumé", "Tailored cover letter", "LinkedIn summary", "1 revision round"],
    turnaround: "2 – 3 days",
    featured: false,
  },
  {
    icon: Megaphone,
    title: "Social Media Content Package",
    price: "$200 / month",
    priceId: "social_content_monthly",
    body: "A full month of captions, hashtags, and content ideas in your brand voice — ready to post. Instagram, Facebook, LinkedIn, or TikTok-ready.",
    deliverables: ["30 captions", "Hashtag sets", "Content calendar", "Monthly strategy"],
    turnaround: "2 – 4 days",
    featured: false,
  },
  {
    icon: Mail,
    title: "Email Marketing Sequence",
    price: "$150",
    priceId: "email_sequence_onetime",
    body: "Welcome sequences, sales funnels, and nurture campaigns that turn subscribers into buyers. Written in your voice, optimized for opens and clicks.",
    deliverables: ["5 – 7 email sequence", "Subject lines", "Call-to-action strategy", "1 revision round"],
    turnaround: "2 – 3 days",
    featured: false,
  },
];


const processSteps = [
  {
    step: "01",
    title: "Tell us what you need",
    body: "Fill out the order form below. Share your business, your goal, and any details that matter — grant deadline, target funder, job title, whatever applies.",
  },
  {
    step: "02",
    title: "We get to work",
    body: "Victoria AI drafts the first version using your details, then a human strategist reviews and polishes everything to professional standard.",
  },
  {
    step: "03",
    title: "Review & refine",
    body: "You receive your draft within the stated turnaround time. One revision round is included — tell us what to adjust and we finalize it.",
  },
  {
    step: "04",
    title: "Submit with confidence",
    body: "Your document is ready to submit — grant application, business plan, résumé, or content calendar. You take the credit.",
  },
];

const faqs = [
  {
    q: "Do you actually write government grants?",
    a: "Yes. We draft full grant narratives and budget justifications for federal, state, local and foundation programs. Grant work is quoted individually rather than bought from this page — request a quote using the order form and we'll confirm scope, price and timeline first. We write the application; you submit it under your organization's name. We never guarantee funding — no ethical grant writer can.",
  },
  {
    q: "Can you guarantee my grant will be approved?",
    a: "No. Anyone who promises a guaranteed grant is scamming you. What we guarantee is a professional, well-written application that gives you the best possible chance. Funding decisions depend on the funder, the competition, and how well your project fits their priorities.",
  },
  {
    q: "How is this different from using the free Victoria AI?",
    a: "Free Victoria gives you drafts to work with. The Services page means a human strategist reviews, refines, and finalizes everything for you — formatted, polished, and ready to submit. You're paying for the finished product, not just the first draft.",
  },
  {
    q: "How do I pay?",
    a: "For the fixed-price packages, tap 'Pay & start' and check out securely by card, Apple Pay, Google Pay, or PayPal — taxes handled automatically. Work begins as soon as payment clears. Quote-only services are invoiced after we agree scope with you.",
  },

  {
    q: "Do you work with nonprofits and for-profits?",
    a: "Both. We write grants for 501(c)(3) nonprofits, social enterprises, small businesses, and individual entrepreneurs. Government grants often require a registered organization — we'll let you know if you're eligible during the intake.",
  },
  {
    q: "What if I need something that's not listed?",
    a: "Choose 'Custom / Not Sure' on the order form and describe what you need. If we can help, we'll send a quote. If we can't, we'll tell you honestly and point you in the right direction.",
  },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Human-reviewed" },
  { icon: Clock, label: "2 – 7 day turnaround" },
  { icon: Check, label: "1 revision included" },
];

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const { openCheckout, loading, error, needsAuth } = usePaddleCheckout();

  return (
    <article
      className={`border-border bg-card/50 relative flex h-full flex-col rounded-2xl border p-6 backdrop-blur-sm md:p-8 ${
        service.featured ? "ring-gold/40 ring-1" : ""
      }`}
    >
      {service.featured ? (
        <span className="bg-gold text-primary-foreground absolute -top-3 right-6 rounded-full px-3 py-1 text-[0.6rem] font-medium tracking-[0.14em] uppercase">
          Most Requested
        </span>
      ) : null}
      <span className="bg-gold/10 text-gold flex h-11 w-11 items-center justify-center rounded-full">
        <service.icon className="h-5 w-5" />
      </span>
      <h3 className="font-display mt-5 text-xl font-light md:text-2xl">{service.title}</h3>
      <p className="text-gold mt-1 text-sm font-medium tracking-wide">{service.price}</p>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{service.body}</p>
      <ul className="mt-5 flex-1 space-y-2">
        {service.deliverables.map((d) => (
          <li key={d} className="flex items-center gap-2 text-sm">
            <Check className="text-blush h-3.5 w-3.5 shrink-0" />
            <span className="text-card-foreground/80">{d}</span>
          </li>
        ))}
      </ul>
      {service.priceId ? (
        <>
          <Button
            variant="lux"
            className="mt-6 w-full"
            disabled={loading}
            onClick={() =>
              openCheckout({ priceId: service.priceId!, serviceTitle: service.title })
            }
          >
            {loading ? "Opening checkout…" : `Pay & start — ${service.price}`}
          </Button>
          {needsAuth ? (
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              Create your free account first so we can attach this order to you.{" "}
              <Link
                to="/auth"
                search={{ mode: "signup", next: "/services" }}
                className="text-gold underline"
              >
                Sign in or join free
              </Link>
              , then tap Pay & start again.
            </p>
          ) : null}
        </>
      ) : (
        <Button variant="lux" className="mt-6 w-full" asChild>
          <a href="#order">Request a quote</a>
        </Button>
      )}

      {error ? <p className="text-destructive mt-2 text-xs">{error}</p> : null}
      <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Clock className="h-3.5 w-3.5" /> {service.turnaround}
        </span>
        <a
          href="#order"
          className="text-blush flex items-center gap-1 text-xs font-medium tracking-wide transition-colors hover:text-blush/80"
        >
          Questions first? <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

function OrderForm() {
  const submit = useServerFn(captureServiceRequest);
  const [submitting, setSubmitting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service_type: "",
    business_name: "",
    details: "",
    budget: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await submit({ data: form });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="border-gold/30 bg-gold/5 mx-auto max-w-2xl rounded-2xl border p-8 text-center md:p-12">
        <div className="bg-gold/10 text-gold mx-auto flex h-14 w-14 items-center justify-center rounded-full">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="font-display mt-5 text-2xl font-light md:text-3xl">Request received</h3>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          Thank you, {form.name.split(" ")[0] || "there"}. We've received your request for{" "}
          <span className="text-gold">{form.service_type}</span>. You'll hear from us within 24 hours
          with a payment link and timeline. Check your email at{" "}
          <span className="text-card-foreground">{form.email}</span>.
        </p>
        <Button variant="lux" className="mt-8" asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-card-foreground text-sm font-medium">
            Name <span className="text-blush">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="border-input bg-card/60 text-foreground placeholder:text-muted-foreground focus:ring-ring mt-2 h-12 w-full rounded-xl border px-4 text-sm outline-none focus:ring-1"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-card-foreground text-sm font-medium">
            Email <span className="text-blush">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="border-input bg-card/60 text-foreground placeholder:text-muted-foreground focus:ring-ring mt-2 h-12 w-full rounded-xl border px-4 text-sm outline-none focus:ring-1"
            placeholder="jane@email.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-card-foreground text-sm font-medium">
            Phone <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="border-input bg-card/60 text-foreground placeholder:text-muted-foreground focus:ring-ring mt-2 h-12 w-full rounded-xl border px-4 text-sm outline-none focus:ring-1"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label htmlFor="business_name" className="text-card-foreground text-sm font-medium">
            Business / Organization <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="business_name"
            type="text"
            value={form.business_name}
            onChange={(e) => update("business_name", e.target.value)}
            className="border-input bg-card/60 text-foreground placeholder:text-muted-foreground focus:ring-ring mt-2 h-12 w-full rounded-xl border px-4 text-sm outline-none focus:ring-1"
            placeholder="Your business name"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="service_type" className="text-card-foreground text-sm font-medium">
          Service needed <span className="text-blush">*</span>
        </label>
        <select
          id="service_type"
          required
          value={form.service_type}
          onChange={(e) => update("service_type", e.target.value)}
          className="border-input bg-card/60 text-foreground placeholder:text-muted-foreground focus:ring-ring mt-2 h-12 w-full rounded-xl border px-4 text-sm outline-none focus:ring-1"
        >
          <option value="">Choose a service…</option>
          {servicesList.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="budget" className="text-card-foreground text-sm font-medium">
          Budget range <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          id="budget"
          type="text"
          value={form.budget}
          onChange={(e) => update("budget", e.target.value)}
          className="border-input bg-card/60 text-foreground placeholder:text-muted-foreground focus:ring-ring mt-2 h-12 w-full rounded-xl border px-4 text-sm outline-none focus:ring-1"
          placeholder="e.g. $300 – $500"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="details" className="text-card-foreground text-sm font-medium">
          Tell us about your project <span className="text-blush">*</span>
        </label>
        <textarea
          id="details"
          required
          rows={5}
          minLength={10}
          value={form.details}
          onChange={(e) => update("details", e.target.value)}
          className="border-input bg-card/60 text-foreground placeholder:text-muted-foreground focus:ring-ring mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-1"
          placeholder="What do you need? Grant deadline? Target funder or job? Include anything that helps us understand your goal."
        />
      </div>

      {error ? (
        <p className="text-blush mt-4 text-sm">{error}</p>
      ) : null}

      <Button
        type="submit"
        variant="gold"
        size="xl"
        className="mt-6 w-full sm:w-auto"
        disabled={submitting}
      >
        {submitting ? "Submitting…" : "Submit Request"}
      </Button>

      <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
        By submitting, you agree to be contacted about your request. We'll send a payment link and
        timeline within 24 hours. No payment required to submit.
      </p>
    </form>
  );
}

export function ServicesPage() {
  return (
    <main>
      <header className="border-border/60 bg-background/85 fixed top-0 z-50 w-full border-b backdrop-blur-md">
        <PaymentTestModeBanner />
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3.5 md:px-10 md:py-4">
          <Link
            to="/join"
            className="font-display text-sm tracking-[0.18em] uppercase sm:text-lg sm:tracking-[0.22em]"
          >
            Her Empire <span className="text-gold">Era</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/join"
              className="text-muted-foreground hover:text-blush hidden text-[0.65rem] tracking-[0.2em] uppercase transition-colors sm:block"
            >
              Join Free
            </Link>
            <Button variant="lux" size="sm" asChild>
              <Link to="/join">Start Free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-background pt-24">
        <div className="relative mx-auto w-full max-w-4xl px-5 pb-12 pt-12 md:px-10 md:pb-20 md:pt-20">
          <p className="eyebrow eyebrow-blush">Done-for-you services</p>
          <h1 className="font-display heading-glow mt-5 text-[2.25rem] leading-[1.08] font-light md:text-6xl md:leading-[1.05]">
            Get the work done for you — without doing it yourself.
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-[0.95rem] leading-relaxed md:text-lg">
            Victoria AI does the heavy lifting, then a human strategist reviews and polishes every
            document to professional standard. Grant applications, business plans, résumés, content
            calendars — ready to submit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {trustBadges.map((b) => (
              <span
                key={b.label}
                className="text-muted-foreground flex items-center gap-2 text-xs tracking-wide"
              >
                <b.icon className="text-gold h-4 w-4" /> {b.label}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <Button variant="gold" size="xl" asChild>
              <a href="#order">Order a Service</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section id="services">
        <SectionHeading
          eyebrow="What we do"
          title={<>Professional services, powered by AI and polished by humans.</>}
          lead="Choose a service below, submit your request, and receive a finished document ready to submit — no blank pages, no guessing."
          glow
        />
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section id="process" className="bg-blush-wash">
        <SectionHeading
          eyebrow="How it works"
          title={<>Four steps from request to finished document.</>}
          glow
        />
        <div className="mt-12 grid gap-x-10 gap-y-9 md:mt-16 md:grid-cols-2 md:gap-x-14 md:gap-y-11">
          {processSteps.map((p) => (
            <div key={p.step} className="border-blush/40 flex gap-5 border-t pt-7 md:gap-6">
              <div className="flex flex-col items-start gap-3">
                <span className="text-gold font-display text-xl">{p.step}</span>
              </div>
              <div>
                <h3 className="text-base font-medium tracking-wide">{p.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Order Form */}
      <Section id="order">
        <SectionHeading
          eyebrow="Place your order"
          title={<>Tell us what you need.</>}
          lead="Fill out the form below and we'll send you a payment link and timeline within 24 hours. No payment required to submit."
          glow
        />
        <div className="mt-10 md:mt-14">
          <OrderForm />
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-secondary/25">
        <SectionHeading
          eyebrow="Questions"
          title={<>Before you order.</>}
          lead="The answers to what people ask before submitting a request."
          glow
        />
        <div className="mx-auto mt-10 max-w-3xl md:mt-14">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="border-border group border-b py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <h3 className="font-display min-w-0 text-lg leading-snug font-light md:text-xl">
                  {item.q}
                </h3>
                <span
                  className="text-blush mt-1 shrink-0 text-lg leading-none transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="text-muted-foreground mt-3 pr-8 text-sm leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section id="cta" className="bg-blush-wash text-center">
        <p className="eyebrow eyebrow-blush">Not ready to order?</p>
        <h2 className="font-display heading-glow mx-auto mt-5 max-w-3xl text-[2.15rem] leading-[1.1] font-light md:text-5xl md:leading-[1.08]">
          Start free with Victoria and do it yourself.
        </h2>
        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed md:text-base">
          Join the free membership and use Victoria AI to draft everything yourself — or come back
          and let us do it for you when you're ready.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button variant="gold" size="xl" asChild>
            <Link to="/join">Start Free</Link>
          </Button>
          <Button variant="lux" size="xl" asChild>
            <Link to="/free-prompts">Get Free Prompts</Link>
          </Button>
        </div>
      </Section>

      <footer className="border-border/60 border-t px-5 py-10 md:px-10">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-[0.65rem] tracking-[0.18em] uppercase sm:flex-row sm:text-xs">
          <p className="font-display text-sm tracking-[0.22em]">Her Empire Era</p>
          <nav className="flex flex-wrap items-center justify-center gap-5">
            <Link to="/join" className="hover:text-blush transition-colors">
              Join
            </Link>
            <Link to="/free-prompts" className="hover:text-blush transition-colors">
              Free Prompts
            </Link>
            <Link to="/opportunity-center" className="hover:text-blush transition-colors">
              Opportunities
            </Link>
            <Link to="/press" className="hover:text-blush transition-colors">
              Press
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
