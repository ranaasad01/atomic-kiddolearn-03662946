import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "KiddoLearn — Learn ABCs, Numbers & Animals!",
  description:
    "KiddoLearn is the most fun place for kids ages 3–8 to learn the alphabet, numbers, and meet amazing animals through interactive games and quizzes!",
  openGraph: {
    title: "KiddoLearn — Learn ABCs, Numbers & Animals!",
    description:
      "Interactive learning games for kids ages 3–8. Alphabet, numbers, animals, and quizzes with cute cartoon characters!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="#"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--background)" }}>
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}