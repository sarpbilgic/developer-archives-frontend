'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Search } from 'lucide-react';

/**
 * Header Component
 * 
 * The top navigation bar containing the logo and search functionality.
 * When user presses Enter, it updates the global search query via Zustand store.
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
    <header className="sticky p-5 m-5 top-0 z-50 border-b border-[var(--border-primary)] bg-[var(--background-secondary)]/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-10 py-8">
        {/* Logo Section */}
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-dark)] shadow-lg shadow-[var(--accent-primary)]/20">
            <span className="text-2xl font-bold text-white">DA</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Developer Archives
            </h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Discover Open Source Projects
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-3xl mx-12">
          <div className="relative group">
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)] transition-colors group-focus-within:text-[var(--accent-primary)]" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search repositories by description, topics, or keywords..."
              className="w-full rounded-lg border border-[var(--border-secondary)] bg-[var(--background-tertiary)] py-4 pl-14 pr-5 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all duration-200 focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
            />
          </div>
        </form>

        {/* Optional: Stats or User Section */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-[var(--border-primary)] bg-[var(--background-tertiary)] px-5 py-2.5">
            <span className="text-sm text-[var(--text-secondary)]">
              Powered by{' '}
              <span className="font-semibold text-[var(--accent-primary)]">AI</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

