import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";
import Header from "./components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Developer Archives - Discover Open Source Projects",
  description: "AI-powered search engine for discovering and exploring open source repositories",
};

// Add loading configuration for better UX
export const viewport = {
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders>
          <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1 overflow-hidden">
              {children}
            </main>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
