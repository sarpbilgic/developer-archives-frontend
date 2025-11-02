'use client';

import { useAppStore } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { searchRepositories } from '@/lib/api';
import RepoCard from '../common/RepoCard';
import { Search, Loader2, AlertCircle, Sparkles, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';


export default function ResultsPane() {
  const { searchQuery, filters, currentPage, pageSize, setCurrentPage } = useAppStore();

  // Fetch search results using React Query
  const {
    data: results,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['search', searchQuery, filters, currentPage, pageSize],
    queryFn: () => searchRepositories(
      searchQuery,
      filters.language,
      filters.minStars,
      filters.topics,
      currentPage,
      pageSize
    ),
    enabled: !!searchQuery,
  });

  // Empty State - No search query yet
  if (!searchQuery) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-3xl bg-gradient-to-br from-background-tertiary to-background-secondary p-8 border-2 border-border-primary/30 shadow-2xl">
              <Search className="h-16 w-16 text-accent-primary" />
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-accent-primary/20 to-accent-dark/20 opacity-50 blur-xl"></div>
            </div>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-text-primary">
            Start Your Search
          </h2>
          <p className="text-text-secondary mb-6 leading-relaxed">
            Enter a search query in the header to discover open source repositories powered by AI.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
            <Sparkles className="h-4 w-4 text-accent-primary animate-pulse" />
            <span>AI-powered semantic search</span>
          </div>
        </div>
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6 flex justify-center">
            <Loader2 className="h-16 w-16 animate-spin text-accent-primary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-accent-primary/20 blur-xl"></div>
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Searching repositories...
          </h3>
          <p className="text-sm text-text-muted flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-accent-primary" />
            Using AI to find the best matches
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="rounded-3xl bg-gradient-to-br from-red-500/10 to-red-600/10 p-8 border-2 border-red-500/30 shadow-2xl shadow-red-500/20">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-text-primary">
            Search Failed
          </h2>
          <p className="text-text-secondary mb-6">
            {error?.message || 'An error occurred while searching. Please try again.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-gradient-to-r from-accent-primary to-accent-hover px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent-primary/30 transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Retry Search
          </button>
        </div>
      </div>
    );
  }

  // No Results State
  if (!results || results.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="rounded-3xl bg-gradient-to-br from-background-tertiary to-background-secondary p-8 border-2 border-border-primary/30 shadow-xl">
              <Search className="h-16 w-16 text-text-muted" />
            </div>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-text-primary">
            No Results Found
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Try adjusting your search query or filters to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  const hasResults = results && results.length > 0;
  const hasMorePages = results && results.length === pageSize;

  // Results Grid
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-8 pb-4">
          {/* Results Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-accent-primary" />
                Search Results
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                {hasResults && (
                  <>
                    Page {currentPage} • {results.length} {results.length === 1 ? 'repository' : 'repositories'}
                  </>
                )}
              </p>
            </div>
            <div className="rounded-xl border border-border-primary/40 bg-gradient-to-br from-background-secondary/60 to-background-tertiary/60 px-5 py-3 backdrop-blur-sm">
              <span className="text-sm text-text-muted">
                Query: <span className="font-semibold text-text-primary">{searchQuery}</span>
              </span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid gap-5 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 pb-4">
            {results.map((project) => (
              <RepoCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      {hasResults && (
        <div className="sticky bottom-0 border-t border-border-primary/30 bg-background-secondary/90 backdrop-blur-xl px-8 py-5 shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-muted font-medium">
              Page {currentPage} of results
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 rounded-xl border-2 border-border-secondary/50 bg-background-tertiary/40 px-4 py-2.5 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-accent-primary/50 hover:bg-background-tertiary hover:text-accent-primary hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-secondary/50 disabled:hover:bg-background-tertiary/40 disabled:hover:text-text-primary disabled:hover:scale-100"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <div className="flex items-center">
                <span className="rounded-xl bg-gradient-to-r from-accent-primary to-accent-hover px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-accent-primary/30">
                  {currentPage}
                </span>
              </div>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!hasMorePages}
                className="flex items-center gap-2 rounded-xl border-2 border-border-secondary/50 bg-background-tertiary/40 px-4 py-2.5 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-accent-primary/50 hover:bg-background-tertiary hover:text-accent-primary hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-secondary/50 disabled:hover:bg-background-tertiary/40 disabled:hover:text-text-primary disabled:hover:scale-100"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
