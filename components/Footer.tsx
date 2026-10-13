"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks, BRAND } from "@/lib/data";
import { useTranslations } from "next-intl";

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = (Array.isArray(t.raw("nav")) ? {} : t.raw("nav")) as Record<string, string>;

  return (
    <footer
      className="w-full mt-auto"
      style={{
        background: "var(--foreground)",
        borderTop: "4px solid var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <motion.span
                className="text-4xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                🐨
              </motion.span>
              <span
                className="text-3xl font-fredoka"
                style={{ color: "var(--border)" }}
              >
                {BRAND.name}
              </span>
            </div>
            <p
              className="text-base font-nunito text-center md:text-left max-w-xs"
              style={{ color: "rgba(255,251,239,0.7)" }}
            >
              {BRAND.tagline} — The most fun place to learn for kids ages 3 to 8!
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center md:justify-end gap-3" role="list">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-base font-nunito font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        background: isActive ? "var(--primary)" : "rgba(255,255,255,0.08)",
                        color: isActive ? "#fff" : "rgba(255,251,239,0.85)",
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span aria-hidden="true">{link.emoji}</span>
                      <span>{navT[link.key] ?? link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,217,61,0.2)" }}
        >
          <p className="text-sm font-nunito" style={{ color: "rgba(255,251,239,0.5)" }}>
            Made with 💛 for curious little learners everywhere!
          </p>
          <div className="flex items-center gap-2">
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 20, -20, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              aria-hidden="true"
            >
              ⭐
            </motion.span>
            <span className="text-sm font-nunito font-bold" style={{ color: "var(--border)" }}>
              {BRAND.name} — Learn, Play, Grow!
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}