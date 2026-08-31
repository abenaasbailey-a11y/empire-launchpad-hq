import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://herempireera.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/join", changefreq: "weekly", priority: "0.9" },
          { path: "/free-prompts", changefreq: "weekly", priority: "0.9" },
          { path: "/chatgpt-prompts", changefreq: "weekly", priority: "0.9" },
          { path: "/marketing-prompts", changefreq: "weekly", priority: "0.9" },
          { path: "/grants-for-women", changefreq: "weekly", priority: "0.9" },
          { path: "/grants-african-women", changefreq: "weekly", priority: "0.9" },
          { path: "/membership", changefreq: "weekly", priority: "1.0" },
          { path: "/services", changefreq: "weekly", priority: "0.9" },

          { path: "/ai-tools-for-women", changefreq: "weekly", priority: "0.9" },
          { path: "/faq", changefreq: "monthly", priority: "0.7" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },

          { path: "/opportunity-center", changefreq: "weekly", priority: "0.9" },
          { path: "/toolkit", changefreq: "weekly", priority: "0.8" },
          { path: "/meet-victoria", changefreq: "weekly", priority: "0.8" },
          { path: "/press", changefreq: "monthly", priority: "0.6" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          { path: "/refunds", changefreq: "yearly", priority: "0.3" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
