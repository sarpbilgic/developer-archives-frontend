'use client';

import { useAppStore } from '@/lib/store';
import FiltersPane from './components/panes/FiltersPane';
import ResultsPane from './components/panes/ResultsPane';
import DetailPane from './components/panes/DetailPane';

/**
 * Main Page Component - Dynamic Two/Three-Pane Layout
 * 
 * This is the main SPA view with flexible columns:
 * 1. FiltersPane (left) - Search filters and options
 * 2. ResultsPane (center/full) - Search results grid
 * 3. DetailPane (right, conditional) - Only shown when a repository is selected
 * 
 * All state is managed via Zustand store, and data fetching via React Query.
 */
export default function HomePage() {
  const selectedProjectId = useAppStore((state) => state.selectedProjectId);

  return (
    <div className="flex h-full w-full gap-1">
      {/* Left Pane - Filters */}
      <aside className="w-72 flex-shrink-0 bg-[var(--background-secondary)] rounded-r-lg">
        <FiltersPane />
      </aside>

      {/* Center Pane - Search Results */}
      <section className="flex-1 min-w-0 bg-[var(--background)]">
        <ResultsPane />
      </section>

      {/* Right Pane - Repository Details (Conditional) */}
      {selectedProjectId && (
        <aside className="w-[520px] flex-shrink-0 bg-[var(--background-secondary)] rounded-l-lg">
          <DetailPane />
        </aside>
      )}
    </div>
  );
}

