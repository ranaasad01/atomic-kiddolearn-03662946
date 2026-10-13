# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Create a colorful kids' learning website for ages 3–8, featuring interactive alphabet games, numbers, animals, fun quizzes, cute cartoon characters, and playful animations. Use bright colors, rounded cards, and a child-friendly responsive design.

## Goal
Build KiddoLearn — a colorful, fully interactive kids' learning website for ages 3–8 with alphabet games, number activities, animal exploration, and fun quizzes, using bright playful design and Framer Motion animations across all five pages.

## Project type
e-commerce

## Design system — match this exactly
- Color tokens: `--background: #FFFBEF`, `--foreground: #1A1A2E`, `--card: #FFFFFF`, `--border: #FFD93D`, `--muted-foreground: #5A5A7A`, `--primary: #FF6B6B`, `--accent: #4D96FF`, `--primary-hover: #ff5252`, `--accent-hover: #3a84ff`, `--group1-border: #09090b`, `--group3-border: #09090b`, `--group2-border: #09090b`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`alphabet`, `alphabet-header`, `animals`, `animals-header`, `footer`, `hero`, `home`, `mascot-intro`, `nav`, `numbers`, `numbers-header`, `quizzes`, `quizzes-header`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
