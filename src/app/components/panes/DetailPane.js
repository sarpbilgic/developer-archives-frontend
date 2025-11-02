'use client';

import { useAppStore } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { getProjectDetails, getProjectReadme } from '@/lib/api';
import ReadmeViewer from '../common/ReadmeViewer';
import {
  Star,
  GitFork,
  Eye,
  AlertCircle,
  ExternalLink,
  Calendar,
  Code2,
  Loader2,
  X,
  FileText,
} from 'lucide-react';

/**
 * DetailPane Component
 * 
 * Right sidebar that displays detailed information about the selected repository.
 * Fetches both project details and README content using React Query.
 */
export default function DetailPane() {
  const { selectedProjectId, clearSelectedProject } = useAppStore();

  // Fetch project details
  const {
    data: project,
    isLoading: isLoadingProject,
    isError: isErrorProject,
  } = useQuery({
    queryKey: ['project', selectedProjectId],
    queryFn: () => getProjectDetails(selectedProjectId),
    enabled: !!selectedProjectId,
  });

  // Fetch README content
  const {
    data: readmeContent,
    isLoading: isLoadingReadme,
    isError: isErrorReadme,
  } = useQuery({
    queryKey: ['readme', selectedProjectId],
    queryFn: () => getProjectReadme(selectedProjectId),
    enabled: !!selectedProjectId,
  });

  // Empty State - No project selected
  if (!selectedProjectId) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-[var(--background-tertiary)] p-6 border border-[var(--border-primary)]">
              <FileText className="h-12 w-12 text-[var(--accent-primary)]" />
            </div>
          </div>
          <h2 className="mb-3 text-xl font-bold text-[var(--text-primary)]">
            No Repository Selected
          </h2>
          <p className="text-[var(--text-secondary)]">
            Click on a repository card to view its details and README
          </p>
        </div>
      </div>
    );
  }

  // Loading State
  if (isLoadingProject) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-[var(--accent-primary)]" />
          <p className="text-sm text-[var(--text-muted)]">Loading details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isErrorProject) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-[var(--error)]" />
          <h2 className="mb-2 text-lg font-bold text-[var(--text-primary)]">
            Failed to Load Details
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Could not fetch repository information
          </p>
          <button
            onClick={clearSelectedProject}
            className="rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format number with commas
  const formatNumber = (num) => {
    return num?.toLocaleString() || '0';
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header with Close Button */}
      <div className="sticky top-0 z-10 border-b border-[var(--border-primary)] bg-[var(--background-secondary)] px-7 py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-[var(--text-primary)] truncate">
              {project.full_name}
            </h2>
            <p className="text-sm text-[var(--text-muted)]">Repository Details</p>
          </div>
          <button
            onClick={clearSelectedProject}
            className="flex-shrink-0 rounded-lg p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--background-tertiary)] hover:text-[var(--text-primary)]"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Project Header */}
        <div className="border-b border-[var(--border-primary)] bg-[var(--background-tertiary)] p-8">
          {/* Owner Avatar and Info */}
          <div className="mb-5 flex items-center gap-4">
            {project.owner_avatar_url && (
              <img
                src={project.owner_avatar_url}
                alt={`${project.owner_login} avatar`}
                className="h-20 w-20 rounded-full border-2 border-[var(--border-primary)]"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-[var(--text-primary)] break-words">
                {project.full_name}
              </h3>
              <a
                href={project.owner_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--accent-primary)] hover:underline mt-1 inline-block"
              >
                @{project.owner_login}
              </a>
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <p className="mb-5 text-[var(--text-secondary)] leading-relaxed">
              {project.description}
            </p>
          )}

          {/* GitHub Link Button */}
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            <ExternalLink className="h-4 w-4" />
            View on GitHub
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-5 border-b border-[var(--border-primary)] p-8">
          <div className="rounded-xl border-2 border-[var(--border-primary)] bg-[var(--background-tertiary)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-5 w-5 text-[var(--accent-primary)]" />
              <span className="text-sm text-[var(--text-muted)]">Stars</span>
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">
              {formatNumber(project.stars)}
            </p>
          </div>

          <div className="rounded-xl border-2 border-[var(--border-primary)] bg-[var(--background-tertiary)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <GitFork className="h-5 w-5 text-[var(--accent-primary)]" />
              <span className="text-sm text-[var(--text-muted)]">Forks</span>
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">
              {formatNumber(project.forks)}
            </p>
          </div>

          <div className="rounded-xl border-2 border-[var(--border-primary)] bg-[var(--background-tertiary)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="h-5 w-5 text-[var(--accent-primary)]" />
              <span className="text-sm text-[var(--text-muted)]">Watchers</span>
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">
              {formatNumber(project.watchers)}
            </p>
          </div>

          <div className="rounded-xl border-2 border-[var(--border-primary)] bg-[var(--background-tertiary)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-[var(--accent-primary)]" />
              <span className="text-sm text-[var(--text-muted)]">Issues</span>
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">
              {formatNumber(project.open_issues)}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-6 border-b border-[var(--border-primary)] p-8">
          {/* Primary Language */}
          {project.primary_language && (
            <div className="flex items-center gap-3">
              <Code2 className="h-5 w-5 text-[var(--accent-primary)]" />
              <div>
                <p className="text-xs text-[var(--text-muted)]">Primary Language</p>
                <p className="font-medium text-[var(--text-primary)]">
                  {project.primary_language}
                </p>
              </div>
            </div>
          )}

          {/* Created Date */}
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[var(--accent-primary)]" />
            <div>
              <p className="text-xs text-[var(--text-muted)]">Created</p>
              <p className="font-medium text-[var(--text-primary)]">
                {formatDate(project.created_at_github)}
              </p>
            </div>
          </div>

          {/* Last Updated */}
          {project.pushed_at_github && (
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[var(--accent-primary)]" />
              <div>
                <p className="text-xs text-[var(--text-muted)]">Last Updated</p>
                <p className="font-medium text-[var(--text-primary)]">
                  {formatDate(project.pushed_at_github)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Topics */}
        {project.topics && project.topics.length > 0 && (
          <div className="border-b border-[var(--border-primary)] p-8">
            <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
              Topics
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {project.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-[var(--border-primary)] bg-[var(--background-tertiary)] px-3 py-1 text-xs font-medium text-[var(--accent-primary)]"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages Breakdown */}
        {project.languages_breakdown && Object.keys(project.languages_breakdown).length > 0 && (
          <div className="border-b border-[var(--border-primary)] p-8">
            <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
              Languages
            </h3>
            <div className="space-y-3">
              {Object.entries(project.languages_breakdown)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([language, bytes]) => {
                  const total = Object.values(project.languages_breakdown).reduce(
                    (sum, val) => sum + val,
                    0
                  );
                  const percentage = ((bytes / total) * 100).toFixed(1);
                  return (
                    <div key={language}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-[var(--text-secondary)]">{language}</span>
                        <span className="text-[var(--text-muted)]">{percentage}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--background-tertiary)]">
                        <div
                          className="h-full bg-[var(--accent-primary)]"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* README Section */}
        <div className="p-8">
          <div className="mb-5 flex items-center gap-2">
            <FileText className="h-5 w-5 text-[var(--accent-primary)]" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">README</h3>
          </div>

          {isLoadingReadme ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--accent-primary)]" />
            </div>
          ) : isErrorReadme ? (
            <div className="rounded-xl border-2 border-[var(--border-primary)] bg-[var(--background-tertiary)] p-6 text-center">
              <AlertCircle className="mx-auto mb-2 h-8 w-8 text-[var(--error)]" />
              <p className="text-sm text-[var(--text-muted)]">
                Failed to load README
              </p>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-[var(--border-primary)] bg-[var(--background-tertiary)]">
              <ReadmeViewer markdownContent={readmeContent} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

