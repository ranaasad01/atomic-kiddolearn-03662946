"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, RotateCcw, Shuffle, Trophy, Zap, BookOpen, Hash } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { QuizQuestion } from "@/lib/data";
import { QUIZ_QUESTIONS } from "@/lib/data";
const quizQuestions: QuizQuestion[] = QUIZ_QUESTIONS;
import { bounceIn, scaleIn, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Inline quiz type definitions ───────────────────────────────────────────

interface QuizMode {
  id: string;
  titleKey: string;
  descKey: string;
  emoji: string;
  color: string;
  bg: string;
  border: string;
  stars: number;
  icon: React.ReactNode;
}

const QUIZ_MODES: QuizMode[] = [
  {
    id: "abc",
    titleKey: "quizzes.modes.abc.title",
    descKey: "quizzes.modes.abc.desc",
    emoji: "🔤",
    color: "#FF6B6B",
    bg: "#FFF0F0",
    border: "#FF6B6B",
    stars: 2,
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    id: "numbers",
    titleKey: "quizzes.modes.numbers.title",
    descKey: "quizzes.modes.numbers.desc",
    emoji: "🔢",
    color: "#4D96FF",
    bg: "#F0F6FF",
    border: "#4D96FF",
    stars: 2,
    icon: <Hash className="h-6 w-6" />,
  },
  {
    id: "animals",
    titleKey: "quizzes.modes.animals.title",
    descKey: "quizzes.modes.animals.desc",
    emoji: "🐾",
    color: "#6BCB77",
    bg: "#F0FFF4",
    border: "#6BCB77",
    stars: 3,
    icon: <span className="h-6 w-6 flex items-center justify-center text-lg">🐾</span>,
  },
  {
    id: "mix",
    titleKey: "quizzes.modes.mix.title",
    descKey: "quizzes.modes.mix.desc",
    emoji: "🧠",
    color: "#CC5DE8",
    bg: "#FAF0FF",
    border: "#CC5DE8",
    stars: 3,
    icon: <Shuffle className="h-6 w-6" />,
  },
];

// ─── Confetti piece ──────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
  "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF",
  "#CC5DE8", "#FF9F43", "#48DBFB", "#FF6B9D",
];

function ConfettiPiece({ index }: { index: number }) {
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const left = `${(index * 7.3 + 3) % 100}%`;
  const delay = `${(index * 0.13) % 2}s`;
  const duration = `${2.5 + (index % 5) * 0.4}s`;
  const size = index % 3 === 0 ? 12 : index % 3 === 1 ? 8 : 10;
  const shape = index % 4 === 0 ? "rounded-full" : index % 4 === 1 ? "rounded-sm rotate-45" : "rounded";

  return (
    <div
      className={cn("absolute top-0 confetti-piece", shape)}
      style={{
        left,
        width: size,
        height: size,
        backgroundColor: color,
        animationDelay: delay,
        animationDuration: duration,
      }}
    />
  );
}

// ─── Timer Arc ───────────────────────────────────────────────────────────────

function TimerArc({ timeLeft, total }: { timeLeft: number; total: number }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / total;
  const strokeDashoffset = circumference * (1 - progress);
  const color = progress > 0.5 ? "#6BCB77" : progress > 0.25 ? "#FFD93D" : "#FF6B6B";

  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      <svg className="absolute inset-0 -rotate-90" width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="5" />
        <circle
          cx="32" cy="32" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.9s linear, stroke 0.3s ease" }}
        />
      </svg>
      <span className="relative z-10 text-xl font-black" style={{ color }}>{timeLeft}</span>
    </div>
  );
}

// ─── Stars display ───────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: i <= count ? 1 : 0.6, rotate: 0 }}
          transition={{ delay: i * 0.18, type: "spring", stiffness: 300, damping: 15 }}
        >
          <Star
            className="h-12 w-12"
            fill={i <= count ? "#FFD93D" : "#E5E7EB"}
            stroke={i <= count ? "#F59E0B" : "#D1D5DB"}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

type GameState = "select" | "playing" | "results";

const TIMER_SECONDS = 5;

const answerVariants: Variants = {
  idle: { scale: 1 },
  correct: { scale: [1, 1.08, 1], backgroundColor: "#DCFCE7", borderColor: "#6BCB77", transition: { duration: 0.4 } },
  wrong: { scale: [1, 0.95, 1], backgroundColor: "#FEE2E2", borderColor: "#FF6B6B", transition: { duration: 0.4 } },
};

export default function QuizzesPage() {
  const t = useTranslations();

  const [gameState, setGameState] = useState<GameState>("select");
  const [selectedMode, setSelectedMode] = useState<QuizMode | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<"idle" | "correct" | "wrong">("idle");
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (advanceRef.current) clearTimeout(advanceRef.current);
  }, []);

  const advanceQuestion = useCallback(() => {
    clearTimers();
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= questions.length) {
        setGameState("results");
        setShowConfetti(true);
        return prev;
      }
      setSelectedAnswer(null);
      setAnswerState("idle");
      setTimeLeft(TIMER_SECONDS);
      return next;
    });
  }, [clearTimers, questions.length]);

  const startTimer = useCallback(() => {
    clearTimers();
    setTimeLeft(TIMER_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimers();
          advanceQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimers, advanceQuestion]);

  const handleAnswer = useCallback(
    (index: number) => {
      if (selectedAnswer !== null) return;
      clearTimers();
      setSelectedAnswer(index);
      const correct = questions[currentIndex]?.correctIndex === index;
      setAnswerState(correct ? "correct" : "wrong");
      if (correct) setScore((s) => s + 1);
      advanceRef.current = setTimeout(() => advanceQuestion(), 1400);
    },
    [selectedAnswer, questions, currentIndex, clearTimers, advanceQuestion],
  );

  const startQuiz = useCallback(
    (mode: QuizMode) => {
      const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
      setSelectedMode(mode);
      setQuestions(shuffled);
      setCurrentIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setAnswerState("idle");
      setGameState("playing");
      setShowConfetti(false);
    },
    [],
  );

  useEffect(() => {
    if (gameState === "playing" && selectedAnswer === null) {
      startTimer();
    }
    return () => clearTimers();
  }, [gameState, currentIndex, selectedAnswer, startTimer, clearTimers]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const currentQuestion = questions[currentIndex];
  const starCount = score >= 9 ? 3 : score >= 6 ? 2 : 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-4">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <ConfettiPiece key={i} index={i} />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {gameState === "select" && (
          <motion.div
            key="select"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="max-w-2xl mx-auto"
          >
            <Reveal className="text-center mb-10">
              <div className="text-6xl mb-4">🧠</div>
              <h1 className="text-4xl font-black text-purple-700 mb-2">{t("quizzes.title")}</h1>
              <p className="text-lg text-gray-500">{t("quizzes.subtitle")}</p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {QUIZ_MODES.map((mode) => (
                <motion.button
                  key={mode.id}
                  variants={bounceIn}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => startQuiz(mode)}
                  className="rounded-3xl p-6 text-left shadow-lg border-2 transition-shadow hover:shadow-xl"
                  style={{ background: mode.bg, borderColor: mode.border }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{mode.emoji}</span>
                    <span style={{ color: mode.color }}>{mode.icon}</span>
                  </div>
                  <div className="font-black text-xl mb-1" style={{ color: mode.color }}>
                    {t(mode.titleKey)}
                  </div>
                  <div className="text-gray-500 text-sm mb-3">{t(mode.descKey)}</div>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <Star
                        key={i}
                        className="h-5 w-5"
                        fill={i <= mode.stars ? mode.color : "#E5E7EB"}
                        stroke={i <= mode.stars ? mode.color : "#D1D5DB"}
                      />
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === "playing" && currentQuestion && (
          <motion.div
            key={`playing-${currentIndex}`}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -60, transition: { duration: 0.25 } }}
            className="max-w-xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2 shadow">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-black text-yellow-600">{score}</span>
              </div>
              <div className="text-sm font-bold text-gray-400">
                {currentIndex + 1} / {questions.length}
              </div>
              <TimerArc timeLeft={timeLeft} total={TIMER_SECONDS} />
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full mb-6 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex) / questions.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Question card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                  {selectedMode?.emoji} {selectedMode && t(selectedMode.titleKey)}
                </span>
              </div>
              <p className="text-2xl font-black text-gray-800 leading-snug">
                {currentQuestion.question}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, i) => (
                <motion.button
                  key={i}
                  variants={answerVariants}
                  animate={
                    selectedAnswer === null
                      ? "idle"
                      : i === currentQuestion.correctIndex
                      ? "correct"
                      : i === selectedAnswer
                      ? "wrong"
                      : "idle"
                  }
                  whileHover={selectedAnswer === null ? { scale: 1.03 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.97 } : {}}
                  onClick={() => handleAnswer(i)}
                  className="rounded-2xl border-2 border-gray-200 bg-white p-4 text-left font-bold text-gray-700 shadow transition-all text-lg"
                >
                  <span className="mr-2 text-purple-400 font-black">{String.fromCharCode(65 + i)}.</span>
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === "results" && (
          <motion.div
            key="results"
            variants={bounceIn}
            initial="hidden"
            animate="visible"
            className="max-w-md mx-auto text-center"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-10">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-black text-purple-700 mb-2">{t("quizzes.results.title")}</h2>
              <p className="text-gray-500 mb-6">{t("quizzes.results.subtitle")}</p>

              <div className="mb-6">
                <StarRating count={starCount} />
              </div>

              <div className="text-5xl font-black text-purple-600 mb-1">
                {score} / {questions.length}
              </div>
              <p className="text-gray-400 mb-8">{t("quizzes.results.score")}</p>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => selectedMode && startQuiz(selectedMode)}
                  className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl py-3 px-6 shadow-lg transition-colors"
                >
                  <RotateCcw className="h-5 w-5" />
                  {t("quizzes.results.retry")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setGameState("select"); setShowConfetti(false); }}
                  className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl py-3 px-6 transition-colors"
                >
                  <Shuffle className="h-5 w-5" />
                  {t("quizzes.results.change")}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
