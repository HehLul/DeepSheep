import Script from 'next/script'
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
      <head>
        <link rel="icon" type="image/png" href="/sheep.png" />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TP62PPZK');
            `
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
          ${plusJakarta.variable} ${quicksand.variable} 
          ${dmSans.variable} ${dmSerifDisplay.variable} 
          antialiased`}
      >
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TP62PPZK"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}