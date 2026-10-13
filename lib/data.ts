export interface NavLink {
  label: string;
  href: string;
  key: string;
  emoji: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home", emoji: "🏠" },
  { label: "Alphabet", href: "/alphabet", key: "alphabet", emoji: "🔤" },
  { label: "Numbers", href: "/numbers", key: "numbers", emoji: "🔢" },
  { label: "Animals", href: "/animals", key: "animals", emoji: "🐾" },
  { label: "Quizzes", href: "/quizzes", key: "quizzes", emoji: "🧠" },
];

export const BRAND = {
  name: "KiddoLearn",
  tagline: "Learn, Play, Grow!",
  mascotName: "Kiko",
  mascotEmoji: "🐨",
} as const;

export interface Animal {
  id: string;
  name: string;
  emoji: string;
  image: string;
  sound: string;
  habitat: string;
  diet: string;
  babyName: string;
  funFact: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  category: "alphabet" | "numbers" | "animals" | "mixed";
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which letter makes the 'sss' sound?",
    options: ["B", "S", "T", "M"],
    correctIndex: 1,
    category: "alphabet",
  },
  {
    id: "q2",
    question: "How many legs does a spider have?",
    options: ["4", "6", "8", "10"],
    correctIndex: 2,
    category: "animals",
  },
  {
    id: "q3",
    question: "What comes after the number 7?",
    options: ["6", "9", "8", "5"],
    correctIndex: 2,
    category: "numbers",
  },
  {
    id: "q4",
    question: "Which animal says MOO?",
    options: ["Dog", "Cat", "Cow", "Duck"],
    correctIndex: 2,
    category: "animals",
  },
  {
    id: "q5",
    question: "Which letter starts the word APPLE?",
    options: ["P", "A", "E", "L"],
    correctIndex: 1,
    category: "alphabet",
  },
  {
    id: "q6",
    question: "How many fingers do you have on one hand?",
    options: ["3", "4", "6", "5"],
    correctIndex: 3,
    category: "numbers",
  },
  {
    id: "q7",
    question: "What colour is a banana?",
    options: ["Red", "Blue", "Yellow", "Green"],
    correctIndex: 2,
    category: "mixed",
  },
  {
    id: "q8",
    question: "Which animal has a very long neck?",
    options: ["Elephant", "Giraffe", "Penguin", "Frog"],
    correctIndex: 1,
    category: "animals",
  },
  {
    id: "q9",
    question: "What letter does BALL start with?",
    options: ["D", "B", "G", "R"],
    correctIndex: 1,
    category: "alphabet",
  },
  {
    id: "q10",
    question: "Count the stars: ⭐⭐⭐⭐ — How many are there?",
    options: ["3", "5", "4", "2"],
    correctIndex: 2,
    category: "numbers",
  },
];

export const ANIMALS: Animal[] = [
  {
    id: "lion",
    name: "Lion",
    emoji: "🦁",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/37093d69dabe4e879e8e916d9b8978ae.jpg",
    sound: "ROAAAAR!",
    habitat: "Grassy plains in Africa",
    diet: "Meat — it is a carnivore!",
    babyName: "Cub",
    funFact: "Lions sleep up to 20 hours every day!",
  },
  {
    id: "elephant",
    name: "Elephant",
    emoji: "🐘",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/6a5d6f747b6741d6a726ad987cc8a371.jpg",
    sound: "TRUMPET!",
    habitat: "Grasslands and forests in Africa and Asia",
    diet: "Plants, grass, and fruit",
    babyName: "Calf",
    funFact: "Elephants can remember their friends for many, many years!",
  },
  {
    id: "dolphin",
    name: "Dolphin",
    emoji: "🐬",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/89c90193e38444fc8295f3e600451801.jpg",
    sound: "CLICK-CLICK-WHISTLE!",
    habitat: "Oceans all around the world",
    diet: "Fish and squid",
    babyName: "Calf",
    funFact: "Dolphins talk to each other using clicks and whistles!",
  },
  {
    id: "giraffe",
    name: "Giraffe",
    emoji: "🦒",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d3d6fc4f7a414e72a64eb1dfa1f67a6d.jpg",
    sound: "HMMM!",
    habitat: "Savannas in Africa",
    diet: "Leaves from tall trees",
    babyName: "Calf",
    funFact: "Giraffes have tongues about 45 cm long to grab leaves!",
  },
  {
    id: "penguin",
    name: "Penguin",
    emoji: "🐧",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8841f0af4a5a40bdb85f6e7791fca4eb.jpg",
    sound: "SQUAWK!",
    habitat: "Antarctica and cold coasts",
    diet: "Fish and krill",
    babyName: "Chick",
    funFact: "Penguins give pebbles to the ones they love as a gift!",
  },
  {
    id: "panda",
    name: "Panda",
    emoji: "🐼",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/2e508bb09b7940c1bc44f7ba7f0fd6db.jpg",
    sound: "BLEAT!",
    habitat: "Mountain forests in China",
    diet: "Bamboo — lots and lots of it!",
    babyName: "Cub",
    funFact: "A baby panda is about the size of a stick of butter when born!",
  },
  {
    id: "fox",
    name: "Fox",
    emoji: "🦊",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/04109ceb8e4d4cb0bddec3d88148499c.jpg",
    sound: "YIPYIP!",
    habitat: "Forests, grasslands, and cities",
    diet: "Berries, insects, and small animals",
    babyName: "Kit",
    funFact: "Foxes use the Earth's magnetic field to hunt — like a compass!",
  },
  {
    id: "turtle",
    name: "Turtle",
    emoji: "🐢",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d1f02ebee86746ccb9986148588b8507.jpg",
    sound: "HISS!",
    habitat: "Oceans and freshwater lakes",
    diet: "Plants, jellyfish, and small fish",
    babyName: "Hatchling",
    funFact: "Some turtles can live for over 100 years!",
  },
  {
    id: "butterfly",
    name: "Butterfly",
    emoji: "🦋",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/f0c98616913b4d4d82cb9709a34aba0d.jpg",
    sound: "...(silent!)",
    habitat: "Gardens, meadows, and forests",
    diet: "Flower nectar",
    babyName: "Caterpillar",
    funFact: "A butterfly tastes food with its feet!",
  },
  {
    id: "frog",
    name: "Frog",
    emoji: "🐸",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/a49b1d2e85274618835c7dccd6bc7c33.jpg",
    sound: "RIBBIT RIBBIT!",
    habitat: "Ponds, rivers, and rainforests",
    diet: "Insects and worms",
    babyName: "Tadpole",
    funFact: "Frogs drink water through their skin — no sipping needed!",
  },
  {
    id: "zebra",
    name: "Zebra",
    emoji: "🦓",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d7b0cbae403041a9a391386d46a3e0c7.jpg",
    sound: "BARK!",
    habitat: "Grasslands in Africa",
    diet: "Grass and leaves",
    babyName: "Foal",
    funFact: "Every zebra has a unique stripe pattern — like a fingerprint!",
  },
  {
    id: "parrot",
    name: "Parrot",
    emoji: "🦜",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c2a75cd0a3a14574ab81b67ef3b1c43c.jpg",
    sound: "SQUAWK!",
    habitat: "Tropical rainforests",
    diet: "Seeds, fruit, and nuts",
    babyName: "Chick",
    funFact: "Parrots can learn hundreds of words and even sing songs!",
  },
];

export const LETTERS = [
  { letter: "A", word: "Apple", emoji: "🍎" },
  { letter: "B", word: "Butterfly", emoji: "🦋" },
  { letter: "C", word: "Cat", emoji: "🐱" },
  { letter: "D", word: "Dog", emoji: "🐶" },
  { letter: "E", word: "Elephant", emoji: "🐘" },
  { letter: "F", word: "Fish", emoji: "🐟" },
  { letter: "G", word: "Giraffe", emoji: "🦒" },
  { letter: "H", word: "Hat", emoji: "🎩" },
  { letter: "I", word: "Ice cream", emoji: "🍦" },
  { letter: "J", word: "Jellyfish", emoji: "🪼" },
  { letter: "K", word: "Kite", emoji: "🪁" },
  { letter: "L", word: "Lion", emoji: "🦁" },
  { letter: "M", word: "Moon", emoji: "🌙" },
  { letter: "N", word: "Nest", emoji: "🪺" },
  { letter: "O", word: "Octopus", emoji: "🐙" },
  { letter: "P", word: "Penguin", emoji: "🐧" },
  { letter: "Q", word: "Queen", emoji: "👑" },
  { letter: "R", word: "Rainbow", emoji: "🌈" },
  { letter: "S", word: "Star", emoji: "⭐" },
  { letter: "T", word: "Tiger", emoji: "🐯" },
  { letter: "U", word: "Umbrella", emoji: "☂️" },
  { letter: "V", word: "Volcano", emoji: "🌋" },
  { letter: "W", word: "Whale", emoji: "🐋" },
  { letter: "X", word: "Xylophone", emoji: "🎵" },
  { letter: "Y", word: "Yak", emoji: "🐃" },
  { letter: "Z", word: "Zebra", emoji: "🦓" },
];

export const NUMBERS = [
  { num: 1, word: "One", emoji: "🍎" },
  { num: 2, word: "Two", emoji: "🐢" },
  { num: 3, word: "Three", emoji: "🌟" },
  { num: 4, word: "Four", emoji: "🐸" },
  { num: 5, word: "Five", emoji: "🍓" },
  { num: 6, word: "Six", emoji: "🦋" },
  { num: 7, word: "Seven", emoji: "🌈" },
  { num: 8, word: "Eight", emoji: "🐙" },
  { num: 9, word: "Nine", emoji: "🌸" },
  { num: 10, word: "Ten", emoji: "🎈" },
  { num: 11, word: "Eleven", emoji: "🐝" },
  { num: 12, word: "Twelve", emoji: "🍪" },
  { num: 13, word: "Thirteen", emoji: "🐠" },
  { num: 14, word: "Fourteen", emoji: "🌻" },
  { num: 15, word: "Fifteen", emoji: "🐣" },
  { num: 16, word: "Sixteen", emoji: "🍉" },
  { num: 17, word: "Seventeen", emoji: "🦄" },
  { num: 18, word: "Eighteen", emoji: "🚂" },
  { num: 19, word: "Nineteen", emoji: "🐧" },
  { num: 20, word: "Twenty", emoji: "🎉" },
];