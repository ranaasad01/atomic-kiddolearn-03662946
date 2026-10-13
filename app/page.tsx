"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, Sparkles, ArrowRight, Heart, Trophy, Zap } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
type APP_NAME = any;
const APP_NAME: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
type APP_TAGLINE = any;
const APP_TAGLINE: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
type MASCOT_NAME = any;
const MASCOT_NAME: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
type categories = any;
const categories: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
import { bounceIn, staggerContainer, scaleIn, fadeInUp } from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const FEATURES = [
  {
    id: "f1",
    emoji: "🔤",
    title: "Alphabet Adventure",
    desc: "Trace letters, hear sounds, and meet a new animal friend for every letter from A to Z.",
    color: "#FF6B6B",
    bg: "#FFF0F0",
    href: "/alphabet",
  },
  {
    id: "f2",
    emoji: "🔢",
    title: "Number Ninja",
    desc: "Count colorful objects, pop number bubbles, and learn to write digits 1 through 20.",
    color: "#4D96FF",
    bg: "#F0F6FF",
    href: "/numbers",
  },
  {
    id: "f3",
    emoji: "🐾",
    title: "Animal Explorer",
    desc: "Discover lions, dolphins, pandas and more. Learn their sounds, homes, and super fun facts!",
    color: "#6BCB77",
    bg: "#F0FFF4",
    href: "/animals",
  },
  {
    id: "f4",
    emoji: "🧠",
    title: "Quiz Champion",
    desc: "Test what you know with silly, colorful quizzes. Earn stars and celebrate every right answer!",
    color: "#CC5DE8",
    bg: "#FAF0FF",
    href: "/quizzes",
  },
];

const FUN_FACTS = [
  { id: "ff1", emoji: "🦒", fact: "A giraffe's tongue is dark blue and can be 45 cm long!", color: "#FFD43B" },
  { id: "ff2", emoji: "🐙", fact: "An octopus has three hearts and blue blood!", color: "#74C0FC" },
  { id: "ff3", emoji: "🦋", fact: "Butterflies taste with their feet — yummy!", color: "#F783AC" },
  { id: "ff4", emoji: "🐘", fact: "Elephants are the only animals that cannot jump!", color: "#A9E34B" },
  { id: "ff5", emoji: "🦈", fact: "Sharks are older than dinosaurs — they have been around for 450 million years!", color: "#63E6BE" },
  { id: "ff6", emoji: "🐝", fact: "A bee visits up to 5,000 flowers in a single day!", color: "#FFD43B" },
];

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Mia, age 5",
    avatar: "👧",
    quote: "I love the animal page! Dolphins are my favourite!",
    stars: 5,
    color: "#FF6B6B",
  },
  {
    id: "t2",
    name: "Noah, age 7",
    avatar: "👦",
    quote: "The quiz is so fun. I got 10 out of 10 and got a big star!",
    stars: 5,
    color: "#4D96FF",
  },
  {
    id: "t3",
    name: "Lily, age 4",
    avatar: "👧",
    quote: "I can write all the letters now. A B C D E F G!",
    stars: 5,
    color: "#6BCB77",
  },
];

const STATS = [
  { id: "s1", value: "26", label: "Letters to Learn", emoji: "🔤", color: "#FF6B6B" },
  { id: "s2", value: "20", label: "Numbers to Count", emoji: "🔢", color: "#4D96FF" },
  { id: "s3", value: "12+", label: "Animal Friends", emoji: "🐾", color: "#6BCB77" },
  { id: "s4", value: "10", label: "Fun Quizzes", emoji: "🧠", color: "#CC5DE8" },
];

// ─── Floating bubble component ───────────────────────────────────────────────

const BUBBLES = [
  { emoji: "⭐", x: "8%", y: "18%", size: 48, delay: 0 },
  { emoji: "🌈", x: "88%", y: "12%", size: 44, delay: 0.3 },
  { emoji: "🎈", x: "5%", y: "72%", size: 40, delay: 0.6 },
  { emoji: "🌟", x: "92%", y: "68%", size: 46, delay: 0.2 },
  { emoji: "🎉", x: "50%", y: "8%", size: 38, delay: 0.5 },
  { emoji: "🦋", x: "78%", y: "82%", size: 36, delay: 0.8 },
];

function FloatingBubble({
  emoji,
  x,
  y,
  size,
  delay,
}: {
  emoji: string;
  x: string;
  y: string;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute select-none pointer-events-none"
      style={{ left: x, top: y, fontSize: size }}
      animate={{ y: [0, -14, 0], rotate: [0, 8, -8, 0] }}
      transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {emoji}
    </motion.div>
  );
}

// ─── Fact card with flip ─────────────────────────────────────────────────────

function FactCard({ fact }: { fact: (typeof FUN_FACTS)[0] }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      className="relative cursor-pointer select-none"
      style={{ perspective: 800, height: 160 }}
      onClick={() => setFlipped((f) => !f)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-2 border-2"
          style={{
            backfaceVisibility: "hidden",
            backgroundColor: fact.color + "22",
            borderColor: fact.color + "66",
          }}
        >
          <span className="text-5xl">{fact.emoji}</span>
          <span className="text-sm font-bold text-gray-500">Tap to reveal!</span>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-3xl flex items-center justify-center p-4 border-2"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: fact.color + "33",
            borderColor: fact.color,
          }}
        >
          <p className="text-center text-sm font-semibold text-gray-700 leading-snug">{fact.fact}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Mascot bounce ───────────────────────────────────────────────────────────

function Mascot() {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="w-36 h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center text-7xl md:text-8xl shadow-[0_8px_32px_rgba(255,107,107,0.35)]"
        style={{ background: "linear-gradient(135deg, #FFD43B 0%, #FF6B6B 100%)" }}
      >
        🦊
      </div>
      <motion.div
        className="mt-3 px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-md"
        style={{ background: "linear-gradient(90deg, #FF6B6B, #CC5DE8)" }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        Hi! I&apos;m {MASCOT_NAME}! 👋
      </motion.div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [factIndex, setFactIndex] = useState(0);

  // Cycle daily fact every 4 s
  useEffect(() => {
    const id = setInterval(() => setFactIndex((i) => (i + 1) % FUN_FACTS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="hero"
          className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #FFF9C4 0%, #FFE0E0 40%, #E0F0FF 100%)",
          }}
        >
          {/* Floating decorations */}
          {BUBBLES.map((b) => (
            <FloatingBubble key={b.emoji} {...b} />
          ))}

          {/* Mascot */}
          <Mascot />

          {/* Headline */}
          <motion.h1
            className="mt-8 text-5xl md:text-7xl font-black tracking-tight text-gray-800 leading-none"
            variants={bounceIn}
            initial="hidden"
            animate="visible"
            style={{ textShadow: "0 2px 0 rgba(0,0,0,0.06)" }}
          >
            <span style={{ color: "var(--primary)" }}>{APP_NAME}</span>
          </motion.h1>

          <motion.p
            className="mt-4 text-2xl md:text-3xl font-bold"
            style={{ color: "#CC5DE8" }}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            {APP_TAGLINE}
          </motion.p>

          <motion.p
            className="mt-4 max-w-xl text-lg text-gray-600 leading-relaxed"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.35 }}
          >
            A magical place for kids aged 3 to 8 to explore letters, numbers, animals, and fun quizzes — all with{" "}
            <span className="font-bold" style={{ color: "#FF6B6B" }}>
              {MASCOT_NAME} the fox
            </span>{" "}
            as your guide!
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-8 flex flex-wrap gap-4 justify-center"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/alphabet"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-lg font-black shadow-[0_4px_20px_rgba(255,107,107,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_28px_rgba(255,107,107,0.6)]"
              style={{ background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)" }}
            >
              Start Learning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/quizzes"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-black border-2 border-[#CC5DE8] text-[#CC5DE8] bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-[#FAF0FF]"
            >
              <Sparkles className="w-5 h-5" /> Take a Quiz!
            </Link>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase">Scroll down</span>
            <span className="text-xl">↓</span>
          </motion.div>
        </section>
      </Reveal>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <Reveal>
        <section className="py-10 px-4" style={{ background: "#FFFBF0" }}>
          <motion.div
            className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {STATS.map((s) => (
              <motion.div
                key={s.id}
                variants={scaleIn}
                className="flex flex-col items-center gap-1 rounded-3xl py-6 px-4 border-2 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                style={{ borderColor: s.color + "55", background: s.color + "18" }}
                whileHover={{ scale: 1.06, rotate: [-1, 1, 0] }}
              >
                <span className="text-4xl">{s.emoji}</span>
                <span className="text-4xl font-black" style={{ color: s.color }}>
                  {s.value}
                </span>
                <span className="text-sm font-semibold text-gray-600 text-center">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </Reveal>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="features" className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-3"
                style={{ background: "#FFF0F0", color: "#FF6B6B" }}
              >
                🎮 What We Learn
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight text-balance">
                Four Worlds of Wonder
              </h2>
              <p className="mt-3 text-gray-500 text-lg max-w-xl mx-auto">
                Pick any world and start your adventure. Every activity is designed to make learning feel like play!
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {FEATURES.map((f, i) => (
                <motion.div key={f.id} variants={scaleIn}>
                  <Link href={f.href} className="group block h-full">
                    <motion.div
                      className="h-full rounded-3xl p-7 border-2 transition-all duration-300 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                      style={{ background: f.bg, borderColor: f.color + "55" }}
                      whileHover={{ y: -6, scale: 1.02 }}
                    >
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-sm"
                        style={{ background: f.color + "22" }}
                      >
                        {f.emoji}
                      </div>
                      <h3 className="text-2xl font-black text-gray-800 mb-2">{f.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{f.desc}</p>
                      <span
                        className="inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-3"
                        style={{ color: f.color }}
                      >
                        Let&apos;s go! <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── FUN FACTS ────────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="facts"
          className="py-20 px-4"
          style={{
            background: "linear-gradient(135deg, #E0F7FA 0%, #F3E5F5 50%, #FFF9C4 100%)",
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-3"
                style={{ background: "#FAF0FF", color: "#CC5DE8" }}
              >
                🤩 Did You Know?
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight text-balance">
                Flip the Cards for Fun Facts!
              </h2>
              <p className="mt-3 text-gray-600 text-lg max-w-xl mx-auto">
                Tap any card to flip it over and discover an amazing fact about the animal world!
              </p>
            </div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {FUN_FACTS.map((f) => (
                <motion.div key={f.id} variants={scaleIn}>
                  <FactCard fact={f} />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10 text-center">
              <Link
                href="/animals"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-white shadow-[0_4px_20px_rgba(107,203,119,0.45)] transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #6BCB77, #4D96FF)" }}
              >
                <span>Meet All Animals</span> <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <Reveal>
        <section id="how-it-works" className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-3"
                style={{ background: "#F0F6FF", color: "#4D96FF" }}
              >
                🚀 How It Works
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight text-balance">
                Learning in 3 Easy Steps
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-stretch">
              {[
                {
                  step: "1",
                  emoji: "🎯",
                  title: "Pick a Topic",
                  desc: "Choose from Alphabet, Numbers, Animals, or Quizzes. Every topic is packed with colorful activities!",
                  color: "#FF6B6B",
                  bg: "#FFF0F0",
                },
                {
                  step: "2",
                  emoji: "🎮",
                  title: "Play and Learn",
                  desc: "Tap, click, and interact with fun games. Hear sounds, see pictures, and discover new things!",
                  color: "#4D96FF",
                  bg: "#F0F6FF",
                },
                {
                  step: "3",
                  emoji: "🏆",
                  title: "Earn Stars",
                  desc: "Answer quiz questions and collect shiny stars. The more you learn, the more you earn!",
                  color: "#FFD43B",
                  bg: "#FFFBF0",
                },
              ].map((s, i) => (
                <Reveal key={s.step} delay={i * 0.12} className="flex-1">
                  <motion.div
                    className="relative h-full rounded-3xl p-8 border-2 text-center shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
                    style={{ background: s.bg, borderColor: s.color + "55" }}
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black text-white mx-auto mb-4 shadow-md"
                      style={{ background: s.color }}
                    >
                      {s.step}
                    </div>
                    <div className="text-5xl mb-4">{s.emoji}</div>
                    <h3 className="text-xl font-black text-gray-800 mb-2">{s.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{s.desc}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="testimonials"
          className="py-20 px-4"
          style={{ background: "linear-gradient(135deg, #FFF9C4 0%, #FFE0E0 100%)" }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-3"
                style={{ background: "#FFF0F0", color: "#FF6B6B" }}
              >
                💬 Kids Love It!
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight text-balance">
                What Our Little Learners Say
              </h2>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {TESTIMONIALS.map((t) => (
                <motion.div
                  key={t.id}
                  variants={scaleIn}
                  className="rounded-3xl p-6 bg-white border-2 shadow-[0_2px_16px_rgba(0,0,0,0.07)]"
                  style={{ borderColor: t.color + "55" }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm"
                      style={{ background: t.color + "22" }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-black text-gray-800 text-sm">{t.name}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.stars }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#FFD43B" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="cta"
          className="py-24 px-4 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #FF6B6B 0%, #CC5DE8 50%, #4D96FF 100%)",
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-20"
            style={{ background: "#FFD43B" }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15"
            style={{ background: "#6BCB77" }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              className="text-7xl mb-6"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              🚀
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight text-balance mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-white/85 text-lg mb-10 leading-relaxed">
              Join {MASCOT_NAME} and thousands of happy kids on the most colorful learning journey ever. It is free, fun, and made just for you!
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/alphabet"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-lg font-black bg-white shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-all hover:scale-105 hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
                style={{ color: "#FF6B6B" }}
              >
                <Zap className="w-5 h-5" /> Start with ABC
              </Link>
              <Link
                href="/quizzes"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-lg font-black border-2 border-white text-white transition-all hover:scale-105 hover:bg-white/15"
              >
                <Trophy className="w-5 h-5" /> Try a Quiz
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/80 text-sm font-semibold">
              {["100% Free", "No Sign-Up Needed", "Safe for Kids", "Works on Any Device"].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 fill-current text-white/60" /> {badge}
                </span>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}