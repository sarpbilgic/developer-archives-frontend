'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Filter, Star, Code2, Tag, Check } from 'lucide-react';

/**
 * FiltersPane Component
 * 
 * Left sidebar containing search filters.
 * Users can set filters and click Apply to update the search.
 */
export default function FiltersPane() {
  const { filters, setFilters, clearFilters } = useAppStore();
  
  // Local state for filter inputs (not applied until user clicks Apply)
  const [localLanguage, setLocalLanguage] = useState(filters.language);
  const [localMinStars, setLocalMinStars] = useState(filters.minStars);
  const [localTopics, setLocalTopics] = useState(filters.topics);

  const handleApplyFilters = () => {
    setFilters({
      language: localLanguage,
      minStars: localMinStars,
      topics: localTopics,
    });
  };

  const handleClearFilters = () => {
    setLocalLanguage('');
    setLocalMinStars('');
    setLocalTopics('');
    clearFilters();
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-[var(--border-primary)] bg-[var(--background-secondary)] px-6 py-6">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-[var(--accent-primary)]" />
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Filters
          </h2>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex-1 space-y-8 p-6">
        {/* Language Filter */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
            <Code2 className="h-4 w-4 text-[var(--accent-primary)]" />
            Language
          </label>
          <input
            type="text"
            value={localLanguage}
            onChange={(e) => setLocalLanguage(e.target.value)}
            placeholder="e.g., Python, JavaScript"
            className="w-full rounded-lg border-2 border-[var(--border-secondary)] bg-[var(--background-tertiary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
          />
          <p className="text-xs text-[var(--text-muted)] mt-2">
            Filter by programming language
          </p>
        </div>

        {/* Min Stars Filter */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
            <Star className="h-4 w-4 text-[var(--accent-primary)]" />
            Minimum Stars
          </label>
          <input
            type="number"
            value={localMinStars}
            onChange={(e) => setLocalMinStars(e.target.value)}
            placeholder="e.g., 100"
            min="0"
            className="w-full rounded-lg border-2 border-[var(--border-secondary)] bg-[var(--background-tertiary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
          />
          <p className="text-xs text-[var(--text-muted)] mt-2">
            Show repos with at least this many stars
          </p>
        </div>

        {/* Topics Filter */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
            <Tag className="h-4 w-4 text-[var(--accent-primary)]" />
            Topics
          </label>
          <input
            type="text"
            value={localTopics}
            onChange={(e) => setLocalTopics(e.target.value)}
            placeholder="e.g., machine-learning"
            className="w-full rounded-lg border-2 border-[var(--border-secondary)] bg-[var(--background-tertiary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
          />
          <p className="text-xs text-[var(--text-muted)] mt-2">
            Filter by repository topics
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 border-t border-[var(--border-primary)] pt-6 mt-2">
          <button
            onClick={handleApplyFilters}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
          >
            <Check className="h-4 w-4" />
            Apply Filters
          </button>
          <button
            onClick={handleClearFilters}
            className="w-full rounded-lg border-2 border-[var(--border-secondary)] bg-[var(--background-tertiary)] px-5 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)]"
          >
            Clear Filters
          </button>
        </div>

        {/* Info Section */}
        <div className="rounded-xl border-2 border-[var(--border-primary)] bg-[var(--background-tertiary)] p-5 mt-4">
          <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">
            Search Tips
          </h3>
          <ul className="space-y-2 text-xs text-[var(--text-muted)]">
            <li>• Use natural language queries</li>
            <li>• Combine filters for better results</li>
            <li>• AI-powered semantic search</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

