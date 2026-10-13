"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Heart, X, Volume2, MapPin, Utensils, Baby, Sparkles, Search } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { bounceIn, staggerContainer, scaleIn } from "@/lib/motion";

interface Animal {
  id: string;
  name: string;
  emoji: string;
  image: string;
  habitat: "land" | "water" | "sky";
  habitatLabel: string;
  diet: string;
  sound: string;
  babyName: string;
  funFacts: string[];
  color: string;
  bgGradient: string;
}

const ANIMALS: Animal[] = [
  {
    id: "dog",
    name: "Dog",
    emoji: "🐶",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/235f66331b5443f4b761fb3b7e2e3e83.jpg",
    habitat: "land",
    habitatLabel: "Land",
    diet: "Meat and vegetables",
    sound: "WOOF WOOF!",
    babyName: "Puppy",
    funFacts: [
      "Dogs can smell 100,000 times better than humans!",
      "A dog's nose print is unique, just like a human fingerprint!",
      "Dogs dream just like people do when they sleep!",
    ],
    color: "#FF6B6B",
    bgGradient: "from-red-100 to-orange-100",
  },
  {
    id: "cat",
    name: "Cat",
    emoji: "🐱",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/53611cafc8844ffa881abd736b68288a.jpg",
    habitat: "land",
    habitatLabel: "Land",
    diet: "Fish and meat",
    sound: "MEOW!",
    babyName: "Kitten",
    funFacts: [
      "Cats sleep 12 to 16 hours every single day!",
      "A cat can jump up to six times its own height!",
      "Cats purr both when happy AND when they feel nervous!",
    ],
    color: "#FF9F43",
    bgGradient: "from-orange-100 to-yellow-100",
  },
  {
    id: "lion",
    name: "Lion",
    emoji: "🦁",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/37093d69dabe4e879e8e916d9b8978ae.jpg",
    habitat: "land",
    habitatLabel: "Land",
    diet: "Meat — it is a carnivore!",
    sound: "ROAAAAR!",
    babyName: "Cub",
    funFacts: [
      "Lions sleep up to 20 hours every day!",
      "A lion's roar can be heard 8 kilometres away!",
      "Female lions do most of the hunting for the group!",
    ],
    color: "#FECA57",
    bgGradient: "from-yellow-100 to-amber-100",
  },
  {
    id: "elephant",
    name: "Elephant",
    emoji: "🐘",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/6a5d6f747b6741d6a726ad987cc8a371.jpg",
    habitat: "land",
    habitatLabel: "Land",
    diet: "Plants, grass, and fruit",
    sound: "TRUMPET!",
    babyName: "Calf",
    funFacts: [
      "Elephants can remember their friends for many, many years!",
      "An elephant's trunk has over 40,000 muscles!",
      "Elephants are the largest land animals on Earth!",
    ],
    color: "#A29BFE",
    bgGradient: "from-purple-100 to-indigo-100",
  },
  {
    id: "penguin",
    name: "Penguin",
    emoji: "🐧",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8841f0af4a5a40bdb85f6e7791fca4eb.jpg",
    habitat: "water",
    habitatLabel: "Water",
    diet: "Fish and squid",
    sound: "SQUAWK!",
    babyName: "Chick",
    funFacts: [
      "Penguins cannot fly but they are amazing swimmers!",
      "Penguins huddle together to stay warm in the cold!",
      "A penguin can hold its breath for up to 20 minutes!",
    ],
    color: "#4D96FF",
    bgGradient: "from-blue-100 to-cyan-100",
  },
  {
    id: "giraffe",
    name: "Giraffe",
    emoji: "🦒",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d3d6fc4f7a414e72a64eb1dfa1f67a6d.jpg",
    habitat: "land",
    habitatLabel: "Land",
    diet: "Leaves from tall trees",
    sound: "HMMM!",
    babyName: "Calf",
    funFacts: [
      "Giraffes are the tallest animals in the whole world!",
      "A giraffe's tongue is 45 centimetres long and dark purple!",
      "Baby giraffes can walk within hours of being born!",
    ],
    color: "#F9CA24",
    bgGradient: "from-yellow-100 to-lime-100",
  },
  {
    id: "dolphin",
    name: "Dolphin",
    emoji: "🐬",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/89c90193e38444fc8295f3e600451801.jpg",
    habitat: "water",
    habitatLabel: "Water",
    diet: "Fish and squid",
    sound: "CLICK-CLICK!",
    babyName: "Calf",
    funFacts: [
      "Dolphins sleep with one eye open to stay safe!",
      "Dolphins talk to each other using clicks and whistles!",
      "Dolphins are one of the smartest animals on Earth!",
    ],
    color: "#00CEC9",
    bgGradient: "from-teal-100 to-cyan-100",
  },
  {
    id: "butterfly",
    name: "Butterfly",
    emoji: "🦋",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/f0c98616913b4d4d82cb9709a34aba0d.jpg",
    habitat: "sky",
    habitatLabel: "Sky",
    diet: "Flower nectar",
    sound: "Flutter flutter!",
    babyName: "Caterpillar",
    funFacts: [
      "Butterflies taste with their feet!",
      "A butterfly starts life as a tiny caterpillar!",
      "Some butterflies migrate thousands of kilometres!",
    ],
    color: "#FD79A8",
    bgGradient: "from-pink-100 to-rose-100",
  },
  {
    id: "frog",
    name: "Frog",
    emoji: "🐸",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/a49b1d2e85274618835c7dccd6bc7c33.jpg",
    habitat: "water",
    habitatLabel: "Water",
    diet: "Insects and worms",
    sound: "RIBBIT!",
    babyName: "Tadpole",
    funFacts: [
      "Frogs drink water through their skin, not their mouth!",
      "Some frogs can jump 20 times their own body length!",
      "There are over 6,000 different kinds of frogs!",
    ],
    color: "#6BCB77",
    bgGradient: "from-green-100 to-emerald-100",
  },
  {
    id: "owl",
    name: "Owl",
    emoji: "🦉",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/91c8a204e9354cbfa2a83441259049ae.jpg",
    habitat: "sky",
    habitatLabel: "Sky",
    diet: "Mice and small animals",
    sound: "HOOT HOOT!",
    babyName: "Owlet",
    funFacts: [
      "Owls can turn their heads almost all the way around!",
      "Owls have special feathers that let them fly silently!",
      "Owls can see in almost total darkness!",
    ],
    color: "#B8860B",
    bgGradient: "from-amber-100 to-yellow-100",
  },
  {
    id: "bear",
    name: "Bear",
    emoji: "🐻",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/f11b7a9b2a744da0900150629710f00e.jpg",
    habitat: "land",
    habitatLabel: "Land",
    diet: "Fish, berries, and honey",
    sound: "GROWL!",
    babyName: "Cub",
    funFacts: [
      "Bears hibernate and sleep all through winter!",
      "Bears are excellent swimmers and love to fish!",
      "A bear can smell food from over 30 kilometres away!",
    ],
    color: "#8B4513",
    bgGradient: "from-amber-100 to-orange-100",
  },
  {
    id: "rabbit",
    name: "Rabbit",
    emoji: "🐰",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/a9828ea5494d47ee8be1671c7781b4d6.jpg",
    habitat: "land",
    habitatLabel: "Land",
    diet: "Grass, carrots, and vegetables",
    sound: "SQUEAK!",
    babyName: "Kitten",
    funFacts: [
      "Rabbits can see almost all the way behind them!",
      "A rabbit's teeth never stop growing throughout its life!",
      "Rabbits can jump up to 90 centimetres high!",
    ],
    color: "#DDA0DD",
    bgGradient: "from-purple-100 to-pink-100",
  },
  {
    id: "shark",
    name: "Shark",
    emoji: "🦈",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8c9f7b6f833f479d951654595334d714.jpg",
    habitat: "water",
    habitatLabel: "Water",
    diet: "Fish and sea creatures",
    sound: "CHOMP!",
    babyName: "Pup",
    funFacts: [
      "Sharks have been on Earth for over 450 million years!",
      "Sharks never run out of teeth — they grow new ones!",
      "Some sharks must keep swimming to breathe!",
    ],
    color: "#4D96FF",
    bgGradient: "from-blue-100 to-indigo-100",
  },
  {
    id: "parrot",
    name: "Parrot",
    emoji: "🦜",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c2a75cd0a3a14574ab81b67ef3b1c43c.jpg",
    habitat: "sky",
    habitatLabel: "Sky",
    diet: "Seeds, fruit, and nuts",
    sound: "SQUAWK! HELLO!",
    babyName: "Chick",
    funFacts: [
      "Parrots can copy human words and sounds!",
      "Some parrots can live for over 80 years!",
      "Parrots use their feet like hands to hold food!",
    ],
    color: "#FF6B6B",
    bgGradient: "from-red-100 to-green-100",
  },
  {
    id: "turtle",
    name: "Turtle",
    emoji: "🐢",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d1f02ebee86746ccb9986148588b8507.jpg",
    habitat: "water",
    habitatLabel: "Water",
    diet: "Plants and jellyfish",
    sound: "Shhh... quiet!",
    babyName: "Hatchling",
    funFacts: [
      "Some turtles can live for over 100 years!",
      "Turtles have been on Earth since the dinosaurs!",
      "A turtle's shell is actually part of its skeleton!",
    ],
    color: "#27AE60",
    bgGradient: "from-green-100 to-teal-100",
  },
  {
    id: "fox",
    name: "Fox",
    emoji: "🦊",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/04109ceb8e4d4cb0bddec3d88148499c.jpg",
    habitat: "land",
    habitatLabel: "Land",
    diet: "Berries, mice, and insects",
    sound: "YIPYIP!",
    babyName: "Kit",
    funFacts: [
      "Foxes use the Earth's magnetic field to hunt!",
      "A fox's bushy tail helps it balance and stay warm!",
      "Foxes are very clever and love to play!",
    ],
    color: "#E67E22",
    bgGradient: "from-orange-100 to-red-100",
  },
];

type HabitatFilter = "all" | "land" | "water" | "sky";

const HABITAT_FILTERS: { key: HabitatFilter; emoji: string; label: string }[] = [
  { key: "all", emoji: "🌍", label: "All Animals" },
  { key: "land", emoji: "🌿", label: "Land" },
  { key: "water", emoji: "🌊", label: "Water" },
  { key: "sky", emoji: "☁️", label: "Sky" },
];

const floatVariant: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [0, -12, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const chipVariant: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.12, type: "spring", stiffness: 300, damping: 18 },
  }),
};

export default function AnimalsPage() {
  const t = useTranslations();
  const [habitatFilter, setHabitatFilter] = useState<HabitatFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [soundPlaying, setSoundPlaying] = useState(false);

  const filtered = useMemo(() => {
    return ANIMALS.filter((a) => {
      const matchesHabitat = habitatFilter === "all" || a.habitat === habitatFilter;
      const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesHabitat && matchesSearch;
    });
  }, [habitatFilter, searchQuery]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const playSound = () => {
    setSoundPlaying(true);
    setTimeout(() => setSoundPlaying(false), 1200);
  };

  return (
    <main className="min-h-screen bg-[var(--page-bg)] pb-16">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-[#F3E5F5] to-[#E3F2FD] pt-10 pb-8 px-4 text-center">
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
            {["🌿", "🌸", "🍃", "🌺", "🌻", "🍀"].map((em, i) => (
              <span
                key={i}
                className="absolute text-3xl opacity-20"
                style={{
                  top: `${10 + (i * 14) % 70}%`,
                  left: `${5 + (i * 17) % 90}%`,
                  transform: `rotate(${i * 30}deg)`,
                }}
              >
                {em}
              </span>
            ))}
          </div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-7xl mb-3 inline-block"
            aria-hidden="true"
          >
            🐾
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--heading-color)] mb-2 tracking-tight">
            {t("animals.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-[var(--body-color)] max-w-xl mx-auto font-medium">
            {t("animals.hero.subtitle")}
          </p>
        </section>
      </Reveal>

      {/* Search + Filter */}
      <Reveal delay={0.05}>
        <section className="max-w-4xl mx-auto px-4 mt-8">
          {/* Search bar */}
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-color)] h-5 w-5" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("animals.search.placeholder")}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-[var(--card-border)] bg-white text-[var(--heading-color)] text-base font-medium shadow-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
              aria-label={t("animals.search.placeholder")}
            />
          </div>

          {/* Habitat filter pills */}
          <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label={t("animals.filter.label")}>
            {HABITAT_FILTERS.map((f) => (
              <motion.button
                key={f.key}
                onClick={() => setHabitatFilter(f.key)}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all duration-200 shadow-sm",
                  habitatFilter === f.key
                    ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-md"
                    : "bg-white text-[var(--heading-color)] border-[var(--card-border)] hover:border-[var(--primary)]"
                )}
                aria-pressed={habitatFilter === f.key}
              >
                <span aria-hidden="true">{f.emoji}</span>
                {f.label}
              </motion.button>
            ))}
          </div>

          {/* Count */}
          <p className="text-center text-sm text-[var(--muted-color)] mt-3 font-medium">
            {filtered.length === 0
              ? t("animals.filter.noResults")
              : t("animals.filter.showing", { count: filtered.length })}
          </p>
        </section>
      </Reveal>

      {/* Animal Grid */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl font-bold text-[var(--heading-color)]">{t("animals.filter.noResults")}</p>
              <p className="text-[var(--muted-color)] mt-1">{t("animals.filter.tryAgain")}</p>
            </motion.div>
          ) : (
            <motion.div
              key={habitatFilter + searchQuery}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5"
            >
              {filtered.map((animal) => (
                <motion.div
                  key={animal.id}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedAnimal(animal)}
                  className={cn(
                    "relative cursor-pointer rounded-3xl border-2 p-4 flex flex-col items-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)]",
                    `bg-gradient-to-br ${animal.bgGradient}`
                  )}
                  style={{ borderColor: animal.color + "55" }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${t("animals.card.open")} ${animal.name}`}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedAnimal(animal)}
                >
                  {/* Favorite button */}
                  <motion.button
                    onClick={(e) => toggleFavorite(animal.id, e)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.85 }}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm"
                    aria-label={favorites.has(animal.id) ? t("animals.card.unfavorite") : t("animals.card.favorite")}
                  >
                    <Heart
                      className="h-4 w-4 transition-colors"
                      style={{ color: favorites.has(animal.id) ? "#FF6B6B" : "#ccc" }}
                      fill={favorites.has(animal.id) ? "#FF6B6B" : "none"}
                    />
                  </motion.button>

                  {/* Emoji */}
                  <span className="text-5xl md:text-6xl leading-none select-none" aria-hidden="true">
                    {animal.emoji}
                  </span>

                  {/* Name */}
                  <span
                    className="text-base md:text-lg font-extrabold text-center leading-tight"
                    style={{ color: animal.color }}
                  >
                    {animal.name}
                  </span>

                  {/* Habitat badge */}
                  <span
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/70 border"
                    style={{ color: animal.color, borderColor: animal.color + "44" }}
                  >
                    {animal.habitatLabel}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Favorites strip */}
      {favorites.size > 0 && (
        <Reveal delay={0.05}>
          <section className="max-w-4xl mx-auto px-4 mt-12">
            <div className="rounded-3xl bg-gradient-to-r from-pink-100 to-red-100 border-2 border-pink-200 p-5">
              <h2 className="text-xl font-extrabold text-[#FF6B6B] mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 fill-[#FF6B6B]" aria-hidden="true" />
                {t("animals.favorites.title")} ({favorites.size})
              </h2>
              <div className="flex flex-wrap gap-2">
                {ANIMALS.filter((a) => favorites.has(a.id)).map((a) => (
                  <motion.button
                    key={a.id}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => setSelectedAnimal(a)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-pink-200 text-sm font-bold text-[#FF6B6B] shadow-sm"
                  >
                    <span aria-hidden="true">{a.emoji}</span>
                    {a.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedAnimal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAnimal(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              aria-hidden="true"
            />

            {/* Modal panel */}
            <motion.div
              key="modal"
              variants={bounceIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.85, y: 30, transition: { duration: 0.25 } }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-label={selectedAnimal.name}
            >
              <div
                className={cn(
                  "relative w-full max-w-md rounded-3xl border-2 shadow-2xl overflow-y-auto max-h-[90vh]",
                  `bg-gradient-to-br ${selectedAnimal.bgGradient}`
                )}
                style={{ borderColor: selectedAnimal.color + "66" }}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedAnimal(null)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 border border-white/50 shadow-sm hover:bg-white transition-colors"
                  aria-label={t("animals.modal.close")}
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>

                <div className="p-6 flex flex-col items-center gap-4">
                  {/* Floating emoji */}
                  <motion.div
                    variants={floatVariant}
                    initial="hidden"
                    animate="visible"
                    className="text-8xl leading-none select-none"
                    aria-hidden="true"
                  >
                    {selectedAnimal.emoji}
                  </motion.div>

                  {/* Name */}
                  <h2
                    className="text-3xl font-extrabold tracking-tight"
                    style={{ color: selectedAnimal.color }}
                  >
                    {selectedAnimal.name}
                  </h2>

                  {/* Sound button */}
                  <motion.button
                    onClick={playSound}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.93 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-white shadow-md transition-all"
                    style={{ background: selectedAnimal.color }}
                    aria-label={t("animals.modal.playSound")}
                  >
                    <Volume2 className="h-5 w-5" aria-hidden="true" />
                    {soundPlaying ? (
                      <motion.span
                        key="playing"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-base"
                      >
                        {selectedAnimal.sound}
                      </motion.span>
                    ) : (
                      <span>{t("animals.modal.soundButton")}</span>
                    )}
                  </motion.button>

                  {/* Fun facts */}
                  <div className="w-full">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-color)] mb-2 flex items-center gap-1">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      {t("animals.modal.funFacts")}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {selectedAnimal.funFacts.map((fact, i) => (
                        <motion.div
                          key={i}
                          custom={i}
                          variants={chipVariant}
                          initial="hidden"
                          animate="visible"
                          className="rounded-2xl bg-white/80 border border-white/60 px-4 py-2.5 text-sm font-semibold text-[var(--heading-color)] shadow-sm flex items-start gap-2"
                        >
                          <span className="text-base leading-snug" aria-hidden="true">💡</span>
                          <span>{fact}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Info rows */}
                  <div className="w-full rounded-2xl bg-white/70 border border-white/60 divide-y divide-white/60 overflow-hidden shadow-sm">
                    <div className="flex items-center gap-3 px-4 py-3">
                      <MapPin className="h-5 w-5 flex-shrink-0" style={{ color: selectedAnimal.color }} aria-hidden="true" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted-color)]">{t("animals.modal.habitat")}</p>
                        <p className="text-sm font-semibold text-[var(--heading-color)]">{selectedAnimal.habitatLabel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3">
                      <Utensils className="h-5 w-5 flex-shrink-0" style={{ color: selectedAnimal.color }} aria-hidden="true" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted-color)]">{t("animals.modal.diet")}</p>
                        <p className="text-sm font-semibold text-[var(--heading-color)]">{selectedAnimal.diet}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3">
                      <Baby className="h-5 w-5 flex-shrink-0" style={{ color: selectedAnimal.color }} aria-hidden="true" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted-color)]">{t("animals.modal.babyName")}</p>
                        <p className="text-sm font-semibold text-[var(--heading-color)]">{selectedAnimal.babyName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sounds like section */}
                  <div className="w-full rounded-2xl bg-white/70 border border-white/60 p-4 shadow-sm">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-color)] mb-2 flex items-center gap-1">
                      <Volume2 className="h-4 w-4" aria-hidden="true" />
                      {t("animals.modal.soundsLike")}
                    </h3>
                    <AnimatePresence mode="wait">
                      {soundPlaying ? (
                        <motion.div
                          key="sound-active"
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.7, opacity: 0 }}
                          className="text-center py-2"
                        >
                          <span
                            className="text-2xl font-extrabold"
                            style={{ color: selectedAnimal.color }}
                          >
                            {selectedAnimal.sound}
                          </span>
                          <div className="flex justify-center gap-1 mt-2">
                            {[0, 1, 2, 3].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ scaleY: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                className="w-1.5 h-4 rounded-full"
                                style={{ background: selectedAnimal.color }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.p
                          key="sound-idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-[var(--muted-color)] font-medium text-center py-1"
                        >
                          {t("animals.modal.soundHint")}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Close button bottom */}
                  <motion.button
                    onClick={() => setSelectedAnimal(null)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="mt-1 px-8 py-3 rounded-full font-extrabold text-white shadow-md text-base"
                    style={{ background: selectedAnimal.color }}
                  >
                    {t("animals.modal.closeButton")}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}