'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Search, Github } from 'lucide-react';
import Image from 'next/image';

/**
 * Header Component
 * 
 * Modern top navigation bar with logo and search functionality.
 * Features glassmorphism design and smooth animations.
 */
export default function Header() {
  const [searchInput, setSearchInput] = useState('');
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border-primary/30 bg-background-secondary/70 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-8 py-5">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden shadow-lg shadow-accent-primary/25 ring-1 ring-white/10">
            <Image
              src="/da_logo.png"
              alt="Developer Archives Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-text-primary">
              Developer Archives
            </h1>
            <p className="mt-0.5 text-xs text-text-muted">
              AI-Powered Repository Search
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-10">
          <div className="relative group">
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-text-muted transition-all duration-200 group-focus-within:text-accent-primary group-focus-within:scale-110" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search repositories by description, topics, or keywords..."
              className="w-full h-8 rounded-xl border-2 border-border-secondary/50 bg-background-tertiary/40 py-3 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 hover:border-border-secondary focus:border-accent-primary focus:bg-background-tertiary focus:outline-none focus:ring-4 focus:ring-accent-primary/10 focus:shadow-lg focus:shadow-accent-primary/5"
            />
          </div>
        </form>

        {/* GitHub Link */}
        <div className="flex items-center">
          <a
            href="https://github.com/sarpbilgic"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-xl border border-border-primary/40 bg-gradient-to-br from-background-tertiary/60 to-background-secondary/60 px-4 py-2.5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-accent-primary/50 hover:shadow-lg hover:shadow-accent-primary/20 hover:scale-105 active:scale-95"
          >
            <Github className="h-4 w-4 text-text-secondary group-hover:text-accent-primary transition-colors duration-200" />
            <span className="text-xs font-semibold text-text-primary group-hover:text-accent-primary transition-colors duration-200">My GitHub Profile</span>
          </a>
        </div>
      </div>
    </header>
  );
}
