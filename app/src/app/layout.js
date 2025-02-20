import { Geist, Geist_Mono } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Quicksand } from "next/font/google";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Theme fonts
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "DeepSheep - Create AI Chatbots",
  description: "Create and customize your own AI chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" type="image/png" href="/sheep.png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
          ${plusJakarta.variable} ${quicksand.variable} 
          ${dmSans.variable} ${dmSerifDisplay.variable} 
          antialiased`}
      >
        {children}
      </body>
    </html>
  );
}