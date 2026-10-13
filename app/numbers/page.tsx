"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Star, RotateCcw, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
type numberEmojis = any;
const numberEmojis: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
import { bounceIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const NUMBER_WORDS: Record<number, string> = {
  1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
  6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten",
  11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen",
  16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen", 20: "twenty",
};

const COUNTING_EMOJIS: Record<number, string> = {
  1: "⭐", 2: "🍎", 3: "🐸", 4: "🌸", 5: "🍕",
  6: "🦋", 7: "🍦", 8: "🐠", 9: "🌈", 10: "🎈",
  11: "🍓", 12: "🐝", 13: "🌻", 14: "🦄", 15: "🍩",
  16: "🐧", 17: "🎀", 18: "🍉", 19: "🦊", 20: "🎉",
};

const GROUP_COLORS = [
  { bg: "bg-[var(--group1-bg)]", border: "border-[var(--group1-border)]", text: "text-[var(--group1-text)]", ring: "ring-[var(--group1-border)]" },
  { bg: "bg-[var(--group2-bg)]", border: "border-[var(--group2-border)]", text: "text-[var(--group2-text)]", ring: "ring-[var(--group2-border)]" },
  { bg: "bg-[var(--group3-bg)]", border: "border-[var(--group3-border)]", text: "text-[var(--group3-text)]", ring: "ring-[var(--group3-border)]" },
  { bg: "bg-[var(--group4-bg)]", border: "border-[var(--group4-border)]", text: "text-[var(--group4-text)]", ring: "ring-[var(--group4-border)]" },
];

function getGroupColor(n: number) {
  return GROUP_COLORS[Math.floor((n - 1) / 5)];
}

interface QuizQ {
  question: string;
  emoji: string;
  count: number;
  options: number[];
  correct: number;
}

const QUIZ_QUESTIONS: QuizQ[] = [
  { question: "How many 🍕 do you see?", emoji: "🍕", count: 4, options: [2, 4, 6, 3], correct: 4 },
  { question: "How many ⭐ do you see?", emoji: "⭐", count: 7, options: [5, 8, 7, 9], correct: 7 },
  { question: "How many 🐸 do you see?", emoji: "🐸", count: 3, options: [3, 5, 2, 4], correct: 3 },
  { question: "How many 🍎 do you see?", emoji: "🍎", count: 10, options: [8, 10, 12, 9], correct: 10 },
  { question: "How many 🦋 do you see?", emoji: "🦋", count: 6, options: [4, 7, 6, 5], correct: 6 },
];

// ─── Variants ────────────────────────────────────────────────────────────────

const popVariant: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 18, delay: i * 0.04 },
  }),
};

const celebrateVariant: Variants = {
  hidden: { scale: 0.5, opacity: 0, rotate: -15 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 14 },
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function CountingGame({ num }: { num: number }) {
  const t = useTranslations();
  const emoji = COUNTING_EMOJIS[num] ?? "⭐";
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const done = tapped.size === num;

  const handleTap = useCallback((i: number) => {
    setTapped((prev) => {
      if (prev.has(i)) return prev;
      return new Set([...prev, i]);
    });
  }, []);

  const reset = useCallback(() => setTapped(new Set()), []);

  return (
    <div className="mt-6 rounded-3xl bg-white/80 border-2 border-[var(--group2-border)] p-6 shadow-[0_4px_24px_rgba(77,150,255,0.12)]">
      <p className="text-center text-lg font-bold text-[var(--group2-text)] mb-4">
        {t("numbers.countingPrompt", { num, emoji })}
      </p>

      <motion.div
        className="flex flex-wrap justify-center gap-3 min-h-[80px]"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        key={num}
      >
        {Array.from({ length: num }, (_, i) => (
          <motion.button
            key={i}
            custom={i}
            variants={popVariant}
            onClick={() => handleTap(i)}
            aria-label={`${emoji} ${i + 1}`}
            className={cn(
              "text-3xl md:text-4xl rounded-2xl p-2 transition-all duration-200 select-none",
              tapped.has(i)
                ? "scale-110 drop-shadow-lg bg-[var(--group2-bg)] ring-2 ring-[var(--group2-border)]"
                : "opacity-60 hover:opacity-100 hover:scale-105 bg-white"
            )}
            whileTap={{ scale: 1.3 }}
          >
            {emoji}
          </motion.button>
        ))}
      </motion.div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <div className="rounded-full bg-[var(--group2-bg)] border-2 border-[var(--group2-border)] px-5 py-2 text-xl font-extrabold text-[var(--group2-text)]">
          {tapped.size} / {num}
        </div>
        <button
          onClick={reset}
          className="rounded-full bg-white border-2 border-[var(--group3-border)] px-4 py-2 text-sm font-bold text-[var(--group3-text)] hover:bg-[var(--group3-bg)] transition-colors"
          aria-label={t("numbers.resetLabel")}
        >
          <RotateCcw className="inline h-4 w-4 mr-1" />
          {t("numbers.reset")}
        </button>
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            variants={celebrateVariant}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-5 rounded-2xl bg-[var(--group3-bg)] border-2 border-[var(--group3-border)] p-4 text-center"
          >
            <p className="text-2xl font-extrabold text-[var(--group3-text)]">
              🎉 {t("numbers.celebrate", { num })} 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NumberQuiz() {
  const t = useTranslations();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = QUIZ_QUESTIONS[current];

  const handleAnswer = (opt: number) => {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === q.correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 >= QUIZ_QUESTIONS.length) {
        setFinished(true);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 1100);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const stars = score >= 5 ? 3 : score >= 3 ? 2 : 1;
    return (
      <motion.div
        variants={celebrateVariant}
        initial="hidden"
        animate="visible"
        className="rounded-3xl bg-white border-2 border-[var(--group4-border)] p-8 text-center shadow-[0_4px_24px_rgba(204,93,232,0.12)]"
      >
        <div className="text-6xl mb-3">
          {score === QUIZ_QUESTIONS.length ? "🏆" : score >= 3 ? "🎉" : "💪"}
        </div>
        <h3 className="text-2xl font-extrabold text-[var(--group4-text)] mb-2">
          {t("numbers.quizDone")}
        </h3>
        <p className="text-lg text-gray-600 mb-4">
          {t("numbers.quizScore", { score, total: QUIZ_QUESTIONS.length })}
        </p>
        <div className="flex justify-center gap-1 mb-6">
          {Array.from({ length: 3 }, (_, i) => (
            <Star
              key={i}
              className={cn(
                "h-10 w-10",
                i < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              )}
            />
          ))}
        </div>
        <button
          onClick={restart}
          className="rounded-full bg-[var(--group4-bg)] border-2 border-[var(--group4-border)] px-8 py-3 text-lg font-extrabold text-[var(--group4-text)] hover:brightness-95 transition-all"
        >
          {t("numbers.quizRestart")} 🔄
        </button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-3xl bg-white border-2 border-[var(--group4-border)] p-6 shadow-[0_4px_24px_rgba(204,93,232,0.12)]">
      <div className="flex items-center justify-between mb-4">
        <span className="rounded-full bg-[var(--group4-bg)] px-4 py-1 text-sm font-bold text-[var(--group4-text)]">
          {t("numbers.quizProgress", { current: current + 1, total: QUIZ_QUESTIONS.length })}
        </span>
        <div className="flex gap-1">
          {QUIZ_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                i < current ? "bg-[var(--group3-border)]" : i === current ? "bg-[var(--group4-border)]" : "bg-gray-200"
              )}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xl font-extrabold text-gray-800 mb-4 text-center">
            {q.question}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6 text-3xl min-h-[56px]">
            {Array.from({ length: q.count }, (_, i) => (
              <span key={i}>{q.emoji}</span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt) => {
              const isCorrect = opt === q.correct;
              const isSelected = opt === selected;
              return (
                <motion.button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "rounded-2xl border-2 py-4 text-2xl font-extrabold transition-all duration-300",
                    selected === null
                      ? "bg-white border-gray-200 text-gray-700 hover:border-[var(--group4-border)] hover:bg-[var(--group4-bg)]"
                      : isCorrect
                      ? "bg-green-100 border-green-400 text-green-700"
                      : isSelected
                      ? "bg-red-100 border-red-400 text-red-600"
                      : "bg-white border-gray-200 text-gray-400 opacity-60"
                  )}
                >
                  {opt}
                  {selected !== null && isCorrect && (
                    <CheckCircle className="inline ml-2 h-5 w-5 text-green-500" />
                  )}
                  {selected !== null && isSelected && !isCorrect && (
                    <XCircle className="inline ml-2 h-5 w-5 text-red-500" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {selected !== null && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mt-4 text-center text-lg font-bold",
                selected === q.correct ? "text-green-600" : "text-red-500"
              )}
            >
              {selected === q.correct ? t("numbers.correct") : t("numbers.wrong", { correct: q.correct })}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function NumbersPage() {
  const t = useTranslations();
  const [selected, setSelected] = useState<number | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const handleSelect = (n: number) => {
    setSelected(n);
    setCompleted((prev) => new Set([...prev, n]));
  };

  const progress = Math.round((completed.size / 20) * 100);

  return (
    <main className="min-h-screen bg-[var(--page-bg)] pb-20">
      {/* ── Hero ── */}
      <Reveal>
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--hero-from)] via-[var(--hero-via)] to-[var(--hero-to)] pt-12 pb-16 px-4 text-center">
          <div className="absolute inset-0 pointer-events-none select-none opacity-10 text-[200px] leading-none flex items-center justify-center">
            🔢
          </div>
          <motion.div
            variants={bounceIn}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <span className="inline-block rounded-full bg-white/70 px-5 py-1.5 text-sm font-bold text-[var(--group2-text)] mb-4 shadow-sm">
              {t("numbers.badge")}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-md mb-3 tracking-tight">
              {t("numbers.heroTitle")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-semibold max-w-xl mx-auto">
              {t("numbers.heroSub")}
            </p>
          </motion.div>
        </section>
      </Reveal>

      <div className="max-w-5xl mx-auto px-4 space-y-14 mt-10">
        {/* ── Progress Bar ── */}
        <Reveal>
          <div className="rounded-3xl bg-white border-2 border-[var(--group2-border)] p-5 shadow-[0_2px_16px_rgba(77,150,255,0.10)]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-[var(--group2-text)] text-lg">
                {t("numbers.progressLabel")}
              </span>
              <span className="rounded-full bg-[var(--group2-bg)] px-3 py-0.5 text-sm font-bold text-[var(--group2-text)]">
                {completed.size} / 20
              </span>
            </div>
            <div className="h-5 w-full rounded-full bg-gray-100 overflow-hidden border border-gray-200">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--group2-border)] to-[var(--group3-border)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <p className="mt-1.5 text-right text-xs font-semibold text-gray-400">
              {progress}% {t("numbers.progressDone")}
            </p>
          </div>
        </Reveal>

        {/* ── Number Grid ── */}
        <Reveal>
          <section>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
              {t("numbers.gridTitle")}
            </h2>
            <motion.div
              className="grid grid-cols-4 sm:grid-cols-5 gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {Array.from({ length: 20 }, (_, i) => {
                const n = i + 1;
                const gc = getGroupColor(n);
                const isSelected = selected === n;
                const isDone = completed.has(n);
                return (
                  <motion.button
                    key={n}
                    variants={scaleIn}
                    onClick={() => handleSelect(n)}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.94 }}
                    aria-label={`${t("numbers.selectLabel")} ${n}`}
                    className={cn(
                      "relative rounded-2xl border-2 p-3 flex flex-col items-center gap-1 transition-all duration-200 shadow-sm",
                      gc.bg, gc.border,
                      isSelected && `ring-4 ${gc.ring} ring-offset-2 scale-105`
                    )}
                  >
                    {isDone && (
                      <span className="absolute -top-2 -right-2 text-base">✅</span>
                    )}
                    <span className={cn("text-3xl font-extrabold", gc.text)}>{n}</span>
                    <span className="text-lg">{COUNTING_EMOJIS[n]}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </section>
        </Reveal>

        {/* ── Number Detail ── */}
        <AnimatePresence mode="wait">
          {selected !== null && (
            <motion.section
              key={selected}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-3xl bg-white border-2 border-[var(--group1-border)] p-8 shadow-[0_4px_32px_rgba(255,107,107,0.12)]"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Big numeral */}
                <motion.div
                  key={`num-${selected}`}
                  variants={bounceIn}
                  initial="hidden"
                  animate="visible"
                  className="flex-shrink-0 w-36 h-36 rounded-3xl bg-gradient-to-br from-[var(--group1-border)] to-[var(--group2-border)] flex items-center justify-center shadow-lg"
                >
                  <span className="text-7xl font-extrabold text-white drop-shadow">
                    {selected}
                  </span>
                </motion.div>

                {/* Word + emoji */}
                <div className="flex-1 text-center md:text-left">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                    {t("numbers.wordLabel")}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 capitalize mb-2">
                    {NUMBER_WORDS[selected]}
                  </h2>
                  <p className="text-3xl">{COUNTING_EMOJIS[selected]}</p>
                  <p className="mt-2 text-gray-500 font-semibold">
                    {t("numbers.tapPrompt")}
                  </p>
                </div>
              </div>

              <CountingGame num={selected} />
            </motion.section>
          )}
        </AnimatePresence>

        {selected === null && (
          <Reveal>
            <div className="rounded-3xl border-2 border-dashed border-[var(--group2-border)] bg-[var(--group2-bg)] p-10 text-center">
              <p className="text-5xl mb-3">👆</p>
              <p className="text-xl font-extrabold text-[var(--group2-text)]">
                {t("numbers.pickPrompt")}
              </p>
            </div>
          </Reveal>
        )}

        {/* ── Fun Facts Strip ── */}
        <Reveal>
          <section>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
              {t("numbers.factsTitle")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(
                [
                  { emoji: "🕷️", fact: t("numbers.fact1") },
                  { emoji: "🐙", fact: t("numbers.fact2") },
                  { emoji: "🌈", fact: t("numbers.fact3") },
                ] as { emoji: string; fact: string }[]
              ).map((item, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={cn(
                    "rounded-2xl border-2 p-5 text-center",
                    GROUP_COLORS[i % GROUP_COLORS.length].bg,
                    GROUP_COLORS[i % GROUP_COLORS.length].border
                  )}>
                    <div className="text-4xl mb-2">{item.emoji}</div>
                    <p className={cn("font-bold text-sm", GROUP_COLORS[i % GROUP_COLORS.length].text)}>
                      {item.fact}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── Number Quiz ── */}
        <Reveal>
          <section>
            <div className="text-center mb-8">
              <span className="inline-block rounded-full bg-[var(--group4-bg)] border-2 border-[var(--group4-border)] px-5 py-1.5 text-sm font-bold text-[var(--group4-text)] mb-3">
                {t("numbers.quizBadge")}
              </span>
              <h2 className="text-3xl font-extrabold text-gray-800">
                {t("numbers.quizTitle")}
              </h2>
              <p className="text-gray-500 mt-1 font-semibold">
                {t("numbers.quizSub")}
              </p>
            </div>
            <NumberQuiz />
          </section>
        </Reveal>

        {/* ── Completion Banner ── */}
        <AnimatePresence>
          {completed.size === 20 && (
            <Reveal>
              <motion.section
                variants={celebrateVariant}
                initial="hidden"
                animate="visible"
                className="rounded-3xl bg-gradient-to-r from-[var(--group1-border)] via-[var(--group3-border)] to-[var(--group2-border)] p-10 text-center text-white shadow-xl"
              >
                <Trophy className="mx-auto h-14 w-14 mb-3 drop-shadow" />
                <h2 className="text-4xl font-extrabold mb-2">
                  {t("numbers.allDoneTitle")}
                </h2>
                <p className="text-xl font-semibold opacity-90">
                  {t("numbers.allDoneSub")}
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-8 w-8 fill-yellow-300 text-yellow-300 drop-shadow" />
                  ))}
                </div>
              </motion.section>
            </Reveal>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}