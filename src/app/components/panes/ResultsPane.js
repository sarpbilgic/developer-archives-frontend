'use client';

import { useAppStore } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { searchRepositories } from '@/lib/api';
import RepoCard from '../common/RepoCard';
import { Search, Loader2, AlertCircle, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * ResultsPane Component
 * 
 * Center pane that displays search results with pagination.
 * Uses React Query to fetch data based on the searchQuery and filters from Zustand store.
 * Shows loading states, errors, and maps results to RepoCard components.
 */
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
    enabled: !!searchQuery, // Only run query if searchQuery exists
  });

  // Empty State - No search query yet
  if (!searchQuery) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-[var(--background-tertiary)] p-6 border border-[var(--border-primary)]">
              <Search className="h-12 w-12 text-[var(--accent-primary)]" />
            </div>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">
            Start Your Search
          </h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Enter a search query in the header to discover open source repositories.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
            <Sparkles className="h-4 w-4 text-[var(--accent-primary)]" />
            <span>Powered by AI semantic search</span>
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
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-[var(--accent-primary)]" />
          <p className="text-lg font-medium text-[var(--text-primary)]">
            Searching repositories...
          </p>
          <p className="text-sm text-[var(--text-muted)]">
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
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-[var(--error)]/10 p-6 border border-[var(--error)]/20">
              <AlertCircle className="h-12 w-12 text-[var(--error)]" />
            </div>
          </div>
          <h2 className="mb-3 text-xl font-bold text-[var(--text-primary)]">
            Search Failed
          </h2>
          <p className="text-[var(--text-secondary)] mb-4">
            {error?.message || 'An error occurred while searching. Please try again.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
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
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-[var(--background-tertiary)] p-6 border border-[var(--border-primary)]">
              <Search className="h-12 w-12 text-[var(--text-muted)]" />
            </div>
          </div>
          <h2 className="mb-3 text-xl font-bold text-[var(--text-primary)]">
            No Results Found
          </h2>
          <p className="text-[var(--text-secondary)]">
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
      <div className="flex-1 overflow-y-auto">
        <div className="p-10">
          {/* Results Header */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                Search Results
              </h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {hasResults && (
                  <>
                    Page {currentPage} • {results.length} {results.length === 1 ? 'repository' : 'repositories'}
                  </>
                )}
              </p>
            </div>
            <div className="rounded-xl border-2 border-[var(--border-primary)] bg-[var(--background-secondary)] px-5 py-3">
              <span className="text-sm text-[var(--text-muted)]">
                Query: <span className="font-medium text-[var(--text-primary)]">{searchQuery}</span>
              </span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
            {results.map((project) => (
              <RepoCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      {hasResults && (
        <div className="border-t border-[var(--border-primary)] bg-[var(--background-secondary)] px-10 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[var(--text-muted)]">
              Page {currentPage} of results
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 rounded-lg border-2 border-[var(--border-secondary)] bg-[var(--background-tertiary)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--border-secondary)] disabled:hover:text-[var(--text-primary)]"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold text-white">
                  {currentPage}
                </span>
              </div>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!hasMorePages}
                className="flex items-center gap-2 rounded-lg border-2 border-[var(--border-secondary)] bg-[var(--background-tertiary)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--border-secondary)] disabled:hover:text-[var(--text-primary)]"
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

