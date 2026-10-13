"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Star, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { bounceIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Inline letter data ───────────────────────────────────────────────────────
interface LetterEntry {
  letter: string;
  word: string;
  emoji: string;
  color: string;
  bg: string;
  matchOptions: { emoji: string; word: string; correct: boolean }[];
}

const LETTERS: LetterEntry[] = [
  { letter: "A", word: "Apple", emoji: "🍎", color: "#FF6B6B", bg: "#FFF0F0",
    matchOptions: [{ emoji: "🍎", word: "Apple", correct: true }, { emoji: "🐝", word: "Bee", correct: false }, { emoji: "🐱", word: "Cat", correct: false }, { emoji: "🦆", word: "Duck", correct: false }] },
  { letter: "B", word: "Bee", emoji: "🐝", color: "#FFB347", bg: "#FFF8EC",
    matchOptions: [{ emoji: "🍎", word: "Apple", correct: false }, { emoji: "🐝", word: "Bee", correct: true }, { emoji: "🐱", word: "Cat", correct: false }, { emoji: "🦆", word: "Duck", correct: false }] },
  { letter: "C", word: "Cat", emoji: "🐱", color: "#FF69B4", bg: "#FFF0F8",
    matchOptions: [{ emoji: "🐝", word: "Bee", correct: false }, { emoji: "🐱", word: "Cat", correct: true }, { emoji: "🦆", word: "Duck", correct: false }, { emoji: "🐘", word: "Elephant", correct: false }] },
  { letter: "D", word: "Duck", emoji: "🦆", color: "#4D96FF", bg: "#F0F6FF",
    matchOptions: [{ emoji: "🦆", word: "Duck", correct: true }, { emoji: "🐘", word: "Elephant", correct: false }, { emoji: "🐸", word: "Frog", correct: false }, { emoji: "🍇", word: "Grapes", correct: false }] },
  { letter: "E", word: "Elephant", emoji: "🐘", color: "#6BCB77", bg: "#F0FFF4",
    matchOptions: [{ emoji: "🐸", word: "Frog", correct: false }, { emoji: "🐘", word: "Elephant", correct: true }, { emoji: "🍇", word: "Grapes", correct: false }, { emoji: "🦔", word: "Hedgehog", correct: false }] },
  { letter: "F", word: "Frog", emoji: "🐸", color: "#CC5DE8", bg: "#FAF0FF",
    matchOptions: [{ emoji: "🐸", word: "Frog", correct: true }, { emoji: "🍇", word: "Grapes", correct: false }, { emoji: "🦔", word: "Hedgehog", correct: false }, { emoji: "🍦", word: "Ice Cream", correct: false }] },
  { letter: "G", word: "Grapes", emoji: "🍇", color: "#FF6B6B", bg: "#FFF0F0",
    matchOptions: [{ emoji: "🍇", word: "Grapes", correct: true }, { emoji: "🦔", word: "Hedgehog", correct: false }, { emoji: "🍦", word: "Ice Cream", correct: false }, { emoji: "🃏", word: "Joker", correct: false }] },
  { letter: "H", word: "Horse", emoji: "🐴", color: "#FFB347", bg: "#FFF8EC",
    matchOptions: [{ emoji: "🐴", word: "Horse", correct: true }, { emoji: "🍦", word: "Ice Cream", correct: false }, { emoji: "🦁", word: "Lion", correct: false }, { emoji: "🐒", word: "Monkey", correct: false }] },
  { letter: "I", word: "Ice Cream", emoji: "🍦", color: "#FF69B4", bg: "#FFF0F8",
    matchOptions: [{ emoji: "🍦", word: "Ice Cream", correct: true }, { emoji: "🦁", word: "Lion", correct: false }, { emoji: "🐒", word: "Monkey", correct: false }, { emoji: "🌙", word: "Moon", correct: false }] },
  { letter: "J", word: "Jellyfish", emoji: "🪼", color: "#4D96FF", bg: "#F0F6FF",
    matchOptions: [{ emoji: "🪼", word: "Jellyfish", correct: true }, { emoji: "🦁", word: "Lion", correct: false }, { emoji: "🐒", word: "Monkey", correct: false }, { emoji: "🌙", word: "Moon", correct: false }] },
  { letter: "K", word: "Koala", emoji: "🐨", color: "#6BCB77", bg: "#F0FFF4",
    matchOptions: [{ emoji: "🐨", word: "Koala", correct: true }, { emoji: "🦁", word: "Lion", correct: false }, { emoji: "🐒", word: "Monkey", correct: false }, { emoji: "🌙", word: "Moon", correct: false }] },
  { letter: "L", word: "Lion", emoji: "🦁", color: "#CC5DE8", bg: "#FAF0FF",
    matchOptions: [{ emoji: "🦁", word: "Lion", correct: true }, { emoji: "🐒", word: "Monkey", correct: false }, { emoji: "🌙", word: "Moon", correct: false }, { emoji: "🦉", word: "Owl", correct: false }] },
  { letter: "M", word: "Monkey", emoji: "🐒", color: "#FF6B6B", bg: "#FFF0F0",
    matchOptions: [{ emoji: "🐒", word: "Monkey", correct: true }, { emoji: "🌙", word: "Moon", correct: false }, { emoji: "🦉", word: "Owl", correct: false }, { emoji: "🐧", word: "Penguin", correct: false }] },
  { letter: "N", word: "Nest", emoji: "🪺", color: "#FFB347", bg: "#FFF8EC",
    matchOptions: [{ emoji: "🪺", word: "Nest", correct: true }, { emoji: "🦉", word: "Owl", correct: false }, { emoji: "🐧", word: "Penguin", correct: false }, { emoji: "🌈", word: "Rainbow", correct: false }] },
  { letter: "O", word: "Owl", emoji: "🦉", color: "#FF69B4", bg: "#FFF0F8",
    matchOptions: [{ emoji: "🦉", word: "Owl", correct: true }, { emoji: "🐧", word: "Penguin", correct: false }, { emoji: "🌈", word: "Rainbow", correct: false }, { emoji: "🌟", word: "Star", correct: false }] },
  { letter: "P", word: "Penguin", emoji: "🐧", color: "#4D96FF", bg: "#F0F6FF",
    matchOptions: [{ emoji: "🐧", word: "Penguin", correct: true }, { emoji: "🌈", word: "Rainbow", correct: false }, { emoji: "🌟", word: "Star", correct: false }, { emoji: "🐢", word: "Turtle", correct: false }] },
  { letter: "Q", word: "Queen", emoji: "👑", color: "#6BCB77", bg: "#F0FFF4",
    matchOptions: [{ emoji: "👑", word: "Queen", correct: true }, { emoji: "🌟", word: "Star", correct: false }, { emoji: "🐢", word: "Turtle", correct: false }, { emoji: "☂️", word: "Umbrella", correct: false }] },
  { letter: "R", word: "Rainbow", emoji: "🌈", color: "#CC5DE8", bg: "#FAF0FF",
    matchOptions: [{ emoji: "🌈", word: "Rainbow", correct: true }, { emoji: "🐢", word: "Turtle", correct: false }, { emoji: "☂️", word: "Umbrella", correct: false }, { emoji: "🎻", word: "Violin", correct: false }] },
  { letter: "S", word: "Star", emoji: "⭐", color: "#FF6B6B", bg: "#FFF0F0",
    matchOptions: [{ emoji: "⭐", word: "Star", correct: true }, { emoji: "🐢", word: "Turtle", correct: false }, { emoji: "☂️", word: "Umbrella", correct: false }, { emoji: "🎻", word: "Violin", correct: false }] },
  { letter: "T", word: "Tiger", emoji: "🐯", color: "#FFB347", bg: "#FFF8EC",
    matchOptions: [{ emoji: "🐯", word: "Tiger", correct: true }, { emoji: "☂️", word: "Umbrella", correct: false }, { emoji: "🎻", word: "Violin", correct: false }, { emoji: "🐋", word: "Whale", correct: false }] },
  { letter: "U", word: "Umbrella", emoji: "☂️", color: "#FF69B4", bg: "#FFF0F8",
    matchOptions: [{ emoji: "☂️", word: "Umbrella", correct: true }, { emoji: "🎻", word: "Violin", correct: false }, { emoji: "🐋", word: "Whale", correct: false }, { emoji: "🦊", word: "Fox", correct: false }] },
  { letter: "V", word: "Violin", emoji: "🎻", color: "#4D96FF", bg: "#F0F6FF",
    matchOptions: [{ emoji: "🎻", word: "Violin", correct: true }, { emoji: "🐋", word: "Whale", correct: false }, { emoji: "🦊", word: "Fox", correct: false }, { emoji: "🍎", word: "Apple", correct: false }] },
  { letter: "W", word: "Whale", emoji: "🐋", color: "#6BCB77", bg: "#F0FFF4",
    matchOptions: [{ emoji: "🐋", word: "Whale", correct: true }, { emoji: "🦊", word: "Fox", correct: false }, { emoji: "🍎", word: "Apple", correct: false }, { emoji: "🐝", word: "Bee", correct: false }] },
  { letter: "X", word: "Xylophone", emoji: "🎵", color: "#CC5DE8", bg: "#FAF0FF",
    matchOptions: [{ emoji: "🎵", word: "Xylophone", correct: true }, { emoji: "🍎", word: "Apple", correct: false }, { emoji: "🐝", word: "Bee", correct: false }, { emoji: "🐱", word: "Cat", correct: false }] },
  { letter: "Y", word: "Yak", emoji: "🦬", color: "#FF6B6B", bg: "#FFF0F0",
    matchOptions: [{ emoji: "🦬", word: "Yak", correct: true }, { emoji: "🐝", word: "Bee", correct: false }, { emoji: "🐱", word: "Cat", correct: false }, { emoji: "🦆", word: "Duck", correct: false }] },
  { letter: "Z", word: "Zebra", emoji: "🦓", color: "#FFB347", bg: "#FFF8EC",
    matchOptions: [{ emoji: "🦓", word: "Zebra", correct: true }, { emoji: "🐱", word: "Cat", correct: false }, { emoji: "🦆", word: "Duck", correct: false }, { emoji: "🐘", word: "Elephant", correct: false }] },
];

// ─── Variants ─────────────────────────────────────────────────────────────────
const letterPop: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -15 },
  visible: {
    opacity: 1, scale: 1, rotate: 0,
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
};

const shakeVariant: Variants = {
  idle: { x: 0 },
  shake: {
    x: [0, -10, 10, -8, 8, -4, 4, 0],
    transition: { duration: 0.5 },
  },
};

const correctBounce: Variants = {
  idle: { scale: 1 },
  bounce: {
    scale: [1, 1.3, 0.9, 1.15, 1],
    transition: { duration: 0.5, type: "spring" },
  },
};

// ─── Confetti burst component ─────────────────────────────────────────────────
const CONFETTI_COLORS = ["#FF6B6B", "#FFB347", "#4D96FF", "#6BCB77", "#CC5DE8", "#FF69B4", "#FFD700"];

function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      {pieces.map((i) => {
        const angle = (i / 18) * 360;
        const distance = 60 + Math.floor(i * 7) % 60;
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const size = 6 + (i % 4) * 2;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size, height: size,
              backgroundColor: color,
              top: "50%", left: "50%",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * distance,
              y: Math.sin((angle * Math.PI) / 180) * distance,
              opacity: 0,
              scale: 0.3,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

// ─── Letter Detail Panel ──────────────────────────────────────────────────────
interface DetailPanelProps {
  entry: LetterEntry;
  isComplete: boolean;
  onComplete: () => void;
  onClose: () => void;
}

function LetterDetailPanel({ entry, isComplete, onComplete, onClose }: DetailPanelProps) {
  const [sayItWiggle, setSayItWiggle] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [matchAnswer, setMatchAnswer] = useState<null | boolean>(null);
  const [matchIndex, setMatchIndex] = useState<null | number>(null);
  const [matchState, setMatchState] = useState<"idle" | "shake" | "bounce">("idle");

  const handleSayIt = () => {
    setSayItWiggle(true);
    setTimeout(() => setSayItWiggle(false), 800);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utt = new SpeechSynthesisUtterance(`${entry.letter} is for ${entry.word}`);
      utt.rate = 0.85;
      window.speechSynthesis.speak(utt);
    }
  };

  const handleGotIt = () => {
    if (!isComplete) {
      setConfetti(true);
      onComplete();
      setTimeout(() => setConfetti(false), 900);
    }
  };

  const handleMatch = (idx: number, correct: boolean) => {
    if (matchAnswer !== null) return;
    setMatchIndex(idx);
    setMatchAnswer(correct);
    setMatchState(correct ? "bounce" : "shake");
    setTimeout(() => setMatchState("idle"), 700);
  };

  // Shuffle options once on mount — stable via useMemo-like approach
  const options = entry.matchOptions;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
        style={{ background: entry.bg, border: `3px solid ${entry.color}` }}
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <ConfettiBurst active={confetti} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg transition-transform hover:scale-110 active:scale-95"
          style={{ background: entry.color }}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-6 sm:p-8 flex flex-col items-center gap-5">
          {/* Giant animated letter */}
          <motion.div
            variants={letterPop}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <span
              className="font-black leading-none select-none"
              style={{ fontSize: "clamp(5rem, 18vw, 9rem)", color: entry.color, textShadow: `0 4px 16px ${entry.color}44` }}
            >
              {entry.letter}
            </span>
            <span className="text-5xl mt-1">{entry.emoji}</span>
            <span className="mt-2 text-2xl font-bold" style={{ color: entry.color }}>
              {entry.letter} is for {entry.word}!
            </span>
          </motion.div>

          {/* Say It button */}
          <motion.button
            variants={{
              idle: { rotate: 0 },
              wiggle: { rotate: [0, -8, 8, -6, 6, -3, 3, 0], transition: { duration: 0.7 } },
            }}
            animate={sayItWiggle ? "wiggle" : "idle"}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            onClick={handleSayIt}
            className="px-7 py-3 rounded-full text-white font-bold text-lg shadow-lg transition-all"
            style={{ background: entry.color }}
          >
            🔊 Say It!
          </motion.button>

          {/* Got It button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleGotIt}
            className="px-7 py-3 rounded-full font-bold text-lg shadow-md transition-all"
            style={{
              background: isComplete ? "#6BCB77" : "#FFD700",
              color: isComplete ? "#fff" : "#333",
            }}
          >
            {isComplete ? "✅ Already Got It!" : "Got It! ⭐"}
          </motion.button>

          {/* Mini matching game */}
          <div className="w-full rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.7)", border: `2px dashed ${entry.color}` }}>
            <p className="text-center font-bold text-gray-700 mb-3 text-base">
              Which one starts with <span style={{ color: entry.color }}>{entry.letter}</span>?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {options.map((opt, idx) => {
                const isSelected = matchIndex === idx;
                const isCorrect = opt.correct;
                let bg = "white";
                let border = "#e5e7eb";
                if (isSelected && matchAnswer === true) { bg = "#d1fae5"; border = "#6BCB77"; }
                if (isSelected && matchAnswer === false) { bg = "#fee2e2"; border = "#FF6B6B"; }

                return (
                  <motion.button
                    key={idx}
                    variants={isSelected ? (matchAnswer ? correctBounce : shakeVariant) : undefined}
                    animate={isSelected ? matchState : "idle"}
                    whileHover={matchAnswer === null ? { scale: 1.05 } : {}}
                    whileTap={matchAnswer === null ? { scale: 0.95 } : {}}
                    onClick={() => handleMatch(idx, isCorrect)}
                    className="flex flex-col items-center gap-1 rounded-2xl p-3 font-semibold text-gray-700 transition-all text-sm"
                    style={{ background: bg, border: `2px solid ${border}` }}
                  >
                    <span className="text-3xl">{opt.emoji}</span>
                    <span>{opt.word}</span>
                    {isSelected && matchAnswer === true && <span className="text-green-600 font-bold">Correct! 🎉</span>}
                    {isSelected && matchAnswer === false && <span className="text-red-500 font-bold">Try again! 😊</span>}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AlphabetPage() {
  const [selected, setSelected] = useState<LetterEntry | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);

  const handleComplete = useCallback((letter: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(letter);
      if (next.size === 26) {
        setTimeout(() => setShowCelebration(true), 400);
      }
      return next;
    });
  }, []);

  const handleReset = () => {
    setCompleted(new Set());
    setShowCelebration(false);
  };

  const progress = (completed.size / 26) * 100;

  return (
    <main className="min-h-screen pb-16" style={{ background: "linear-gradient(160deg, #FFF8F0 0%, #F0F6FF 50%, #F0FFF4 100%)" }}>
      {/* ── Hero ── */}
      <Reveal>
        <section className="pt-10 pb-6 px-4 text-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="inline-block mb-3"
          >
            <span className="text-6xl">🔤</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-800 mb-2">
            The <span style={{ color: "#FF6B6B" }}>Alphabet</span> Adventure!
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Tap any letter to learn its word, hear it spoken, and play a matching game. Collect all 26 stars!
          </p>
        </section>
      </Reveal>

      {/* ── Progress Bar ── */}
      <Reveal delay={0.1}>
        <section className="px-4 max-w-2xl mx-auto mb-8">
          <div className="rounded-2xl p-4 shadow-md" style={{ background: "white", border: "2px solid #FFD700" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-700 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                {completed.size} / 26 Letters Learned
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-400 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
            <div className="w-full h-5 rounded-full overflow-hidden" style={{ background: "#F3F4F6" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #FF6B6B, #FFB347, #FFD700)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <p className="text-right text-sm text-gray-500 mt-1">{Math.round(progress)}% complete</p>
          </div>
        </section>
      </Reveal>

      {/* ── Celebration Banner ── */}
      <AnimatePresence>
        {showCelebration && (
          <Reveal>
            <motion.section
              className="px-4 max-w-2xl mx-auto mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <div className="rounded-3xl p-6 text-center shadow-xl" style={{ background: "linear-gradient(135deg, #FFD700, #FF6B6B)", border: "3px solid #FFB347" }}>
                <div className="text-5xl mb-2">🏆🎉🌟</div>
                <h2 className="text-3xl font-black text-white mb-1">You Did It!</h2>
                <p className="text-white/90 text-lg font-semibold">
                  Amazing! You learned all 26 letters of the alphabet! You are a superstar!
                </p>
                <motion.div className="flex justify-center gap-2 mt-3 flex-wrap">
                  {LETTERS.map((l) => (
                    <span key={l.letter} className="text-xl">{l.emoji}</span>
                  ))}
                </motion.div>
              </div>
            </motion.section>
          </Reveal>
        )}
      </AnimatePresence>

      {/* ── A–Z Grid ── */}
      <Reveal delay={0.15}>
        <section className="px-4 max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-3"
          >
            {LETTERS.map((entry, i) => {
              const done = completed.has(entry.letter);
              return (
                <motion.button
                  key={entry.letter}
                  variants={scaleIn}
                  whileHover={{ scale: 1.12, rotate: 3 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelected(entry)}
                  className="relative flex flex-col items-center justify-center rounded-2xl p-3 font-black text-2xl shadow-md transition-all focus:outline-none focus-visible:ring-4"
                  style={{
                    background: done ? entry.color : entry.bg,
                    border: `2.5px solid ${entry.color}`,
                    color: done ? "white" : entry.color,
                    boxShadow: done
                      ? `0 4px 18px ${entry.color}55`
                      : `0 2px 8px ${entry.color}22`,
                    minHeight: 72,
                  }}
                  aria-label={`Letter ${entry.letter}`}
                >
                  {done && (
                    <motion.span
                      className="absolute -top-2 -right-2 text-base"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      ⭐
                    </motion.span>
                  )}
                  <span className="leading-none">{entry.letter}</span>
                  <span className="text-base mt-0.5">{entry.emoji}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </section>
      </Reveal>

      {/* ── How to Play ── */}
      <Reveal delay={0.2}>
        <section className="px-4 max-w-3xl mx-auto mt-12">
          <div className="rounded-3xl p-6 sm:p-8" style={{ background: "white", border: "2px solid #4D96FF22", boxShadow: "0 4px 24px rgba(77,150,255,0.08)" }}>
            <div className="flex items-center gap-3 mb-5">
              <Sparkles className="w-7 h-7 text-yellow-400" />
              <h2 className="text-2xl font-black text-gray-800">How to Play</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { step: "1", icon: "👆", title: "Tap a Letter", desc: "Pick any letter from the colorful grid above." },
                { step: "2", icon: "🔊", title: "Learn the Word", desc: "See the example word and tap Say It to hear it!" },
                { step: "3", icon: "⭐", title: "Earn a Star", desc: "Match the emoji and tap Got It to collect your star." },
              ].map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl" style={{ background: "#F9FAFB" }}>
                  <span className="text-4xl">{s.icon}</span>
                  <span className="font-black text-gray-800 text-lg">{s.title}</span>
                  <span className="text-gray-500 text-sm leading-relaxed">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Fun Alphabet Facts ── */}
      <Reveal delay={0.25}>
        <section className="px-4 max-w-3xl mx-auto mt-10">
          <h2 className="text-2xl font-black text-gray-800 mb-5 text-center">
            🌟 Fun Alphabet Facts
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { emoji: "📚", fact: "The English alphabet has 26 letters — 5 vowels and 21 consonants!", color: "#FF6B6B" },
              { emoji: "🌍", fact: "The word 'alphabet' comes from the first two Greek letters: Alpha and Beta!", color: "#4D96FF" },
              { emoji: "✍️", fact: "Every letter can be written in UPPERCASE and lowercase — that is 52 shapes to learn!", color: "#6BCB77" },
              { emoji: "🎵", fact: "The ABC song was first published in 1835 and kids have been singing it ever since!", color: "#CC5DE8" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="flex gap-4 items-start rounded-2xl p-4 shadow-sm"
                style={{ background: "white", border: `2px solid ${item.color}33` }}
              >
                <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{item.fact}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Letter Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <LetterDetailPanel
            key={selected.letter}
            entry={selected}
            isComplete={completed.has(selected.letter)}
            onComplete={() => handleComplete(selected.letter)}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}