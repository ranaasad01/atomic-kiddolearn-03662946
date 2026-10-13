"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from 'lucide-react';
import { navLinks, BRAND } from "@/lib/data";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations();
  const navT = (Array.isArray(t.raw("nav")) ? {} : t.raw("nav")) as Record<string, string>;

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "var(--card)",
        borderBottom: "3px solid var(--border)",
        boxShadow: "0 4px 16px rgba(77,150,255,0.10)",
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="KiddoLearn Home">
          <motion.span
            className="text-3xl"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🐨
          </motion.span>
          <span
            className="text-2xl md:text-3xl font-fredoka tracking-wide"
            style={{ color: "var(--primary)" }}
          >
            {BRAND.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-lg font-nunito font-700 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    background: isActive ? "var(--primary)" : "transparent",
                    color: isActive ? "#fff" : "var(--foreground)",
                    fontWeight: 700,
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-2xl transition-colors"
          style={{ color: "var(--primary)" }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden"
            style={{ background: "var(--card)", borderTop: "2px solid var(--border)" }}
          >
            <ul className="flex flex-col gap-1 p-4" role="list">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xl font-nunito transition-all duration-200"
                      style={{
                        background: isActive ? "var(--primary)" : "var(--background)",
                        color: isActive ? "#fff" : "var(--foreground)",
                        fontWeight: 700,
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span aria-hidden="true" className="text-2xl">{link.emoji}</span>
                      <span>{navT[link.key] ?? link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}