'use client';

import { useAppStore } from '@/lib/store';
import FiltersPane from './components/panes/FiltersPane';
import ResultsPane from './components/panes/ResultsPane';
import DetailPane from './components/panes/DetailPane';

/**
 * Main Page Component - Modern Dynamic Layout
 * 
 * Flexible three-pane layout with smooth transitions and animations.
 */
export default function HomePage() {
  const selectedProjectId = useAppStore((state) => state.selectedProjectId);

  return (
    <div className="flex h-full w-full gap-3 bg-background">
      {/* Left Pane - Filters */}
      <aside className="w-72 shrink-0 bg-background-secondary rounded-r-2xl overflow-hidden animate-fade-in shadow-xl">
        <FiltersPane />
      </aside>

      {/* Center Pane - Search Results */}
      <section className="flex-1 min-w-0 bg-background animate-fade-in">
        <ResultsPane />
      </section>

      {/* Right Pane - Repository Details (Conditional with Animation) */}
      {selectedProjectId && (
        <aside className="w-[520px] shrink-0 bg-background-secondary rounded-l-2xl overflow-hidden animate-slide-down shadow-2xl">
          <DetailPane />
        </aside>
      )}
    </div>
  );
}
