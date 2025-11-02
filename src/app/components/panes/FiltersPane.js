'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Filter, Star, Code2, Tag, Check, X, Sparkles } from 'lucide-react';


export default function FiltersPane() {
  const { filters, setFilters, clearFilters } = useAppStore();
  
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
      <div className="sticky top-0 z-10 border-b border-border-primary/30 bg-background-secondary/80 backdrop-blur-xl px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-dark/20 p-2 ring-1 ring-accent-primary/30">
            <Filter className="h-4 w-4 text-accent-primary" />
          </div>
          <h2 className="text-base font-bold text-text-primary">
            Filters
          </h2>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex-1 space-y-10 p-6">
        {/* Language Filter */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Code2 className="h-4 w-4 text-accent-primary" />
            Language
          </label>
          <input
            type="text"
            value={localLanguage}
            onChange={(e) => setLocalLanguage(e.target.value)}
            placeholder="e.g., Python, JavaScript"
            className="w-full rounded-xl border-2 border-border-secondary/50 bg-background-tertiary/40 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 hover:border-border-secondary focus:border-accent-primary focus:bg-background-tertiary focus:outline-none focus:ring-4 focus:ring-accent-primary/10"
          />
          <p className="text-xs text-text-muted mt-3">
            Filter by programming language
          </p>
        </div>

        {/* Min Stars Filter */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Star className="h-4 w-4 text-accent-primary" />
            Minimum Stars
          </label>
          <input
            type="number"
            value={localMinStars}
            onChange={(e) => setLocalMinStars(e.target.value)}
            placeholder="e.g., 100"
            min="0"
            className="w-full rounded-xl border-2 border-border-secondary/50 bg-background-tertiary/40 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 hover:border-border-secondary focus:border-accent-primary focus:bg-background-tertiary focus:outline-none focus:ring-4 focus:ring-accent-primary/10"
          />
          <p className="text-xs text-text-muted mt-3">
            Show repos with at least this many stars
          </p>
        </div>

        {/* Topics Filter */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Tag className="h-4 w-4 text-accent-primary" />
            Topics
          </label>
          <input
            type="text"
            value={localTopics}
            onChange={(e) => setLocalTopics(e.target.value)}
            placeholder="e.g., machine-learning"
            className="w-full rounded-xl border-2 border-border-secondary/50 bg-background-tertiary/40 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 hover:border-border-secondary focus:border-accent-primary focus:bg-background-tertiary focus:outline-none focus:ring-4 focus:ring-accent-primary/10"
          />
          <p className="text-xs text-text-muted mt-3">
            Filter by repository topics
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 border-t border-border-primary/30 pt-8 mt-6">
          <button
            onClick={handleApplyFilters}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-hover px-5 py-3 text-sm font-bold text-white shadow-lg shadow-accent-primary/30 transition-all duration-200 hover:shadow-xl hover:shadow-accent-primary/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Check className="h-4 w-4" />
            Apply Filters
          </button>
          <button
            onClick={handleClearFilters}
            className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-border-secondary/50 bg-background-tertiary/40 px-5 py-3 text-sm font-semibold text-text-secondary transition-all duration-200 hover:border-accent-primary/50 hover:bg-background-tertiary hover:text-text-primary hover:scale-[1.02] active:scale-[0.98]"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </button>
        </div>

        {/* Info Section */}
        <div className="rounded-2xl border border-border-primary/30 bg-gradient-to-br from-background-tertiary/60 to-background-secondary/60 p-5 backdrop-blur-sm mt-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-accent-primary" />
            <h3 className="text-sm font-bold text-text-primary">
              Search Tips
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-text-muted">
            <li className="flex items-start gap-2">
              <span className="text-accent-primary">•</span>
              <span>Use natural language queries</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-primary">•</span>
              <span>Combine filters for better results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-primary">•</span>
              <span>AI-powered semantic search</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
