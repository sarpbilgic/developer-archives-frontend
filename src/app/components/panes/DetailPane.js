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
  TrendingUp,
  Package,
} from 'lucide-react';

/**
 * DetailPane Component - Modern Repository Details
 * 
 * Sleek, modern detail pane with glassmorphism and smooth animations.
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

  // Empty State
  if (!selectedProjectId) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="mb-8 flex justify-center">
            <div className="rounded-3xl bg-gradient-to-br from-background-tertiary to-background-secondary p-8 border-2 border-border-primary/30 shadow-xl">
              <FileText className="h-16 w-16 text-accent-primary" />
            </div>
          </div>
          <h2 className="mb-4 text-2xl font-bold text-text-primary">
            No Repository Selected
          </h2>
          <p className="text-text-secondary leading-relaxed">
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
          <div className="relative mb-6 flex justify-center">
            <Loader2 className="h-14 w-14 animate-spin text-accent-primary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full bg-accent-primary/20 blur-xl"></div>
            </div>
          </div>
          <p className="text-sm font-medium text-text-muted">Loading details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isErrorProject) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="mb-8 flex justify-center">
            <div className="rounded-3xl bg-gradient-to-br from-red-500/10 to-red-600/10 p-8 border-2 border-red-500/30 shadow-xl">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
          </div>
          <h2 className="mb-4 text-xl font-bold text-text-primary">
            Failed to Load Details
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            Could not fetch repository information
          </p>
          <button
            onClick={clearSelectedProject}
            className="rounded-xl bg-gradient-to-r from-accent-primary to-accent-hover px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent-primary/30 transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const formatNumber = (num) => {
    return num?.toLocaleString() || '0';
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header with Close Button */}
      <div className="sticky top-0 z-10 border-b border-border-primary/30 bg-background-secondary/80 backdrop-blur-xl px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-text-primary truncate">
              {project.full_name}
            </h2>
            <p className="text-xs text-text-muted mt-1">
              by @{project.owner_login}
            </p>
          </div>
          <button
            onClick={clearSelectedProject}
            className="shrink-0 rounded-lg p-2 text-text-muted transition-all duration-200 hover:bg-background-tertiary hover:text-text-primary hover:scale-110 active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Project Header */}
        <div className="border-b border-border-primary/30 bg-gradient-to-br from-background-tertiary/60 to-background-secondary/60 p-6">
          {/* Owner Avatar and Info */}
          <div className="mb-5 flex items-center gap-4">
            {project.owner_avatar_url && (
              <img
                src={project.owner_avatar_url}
                alt={`${project.owner_login} avatar`}
                className="h-16 w-16 rounded-2xl border-2 border-border-primary/50 ring-2 ring-background-tertiary shadow-xl"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-text-primary break-words">
                {project.full_name}
              </h3>
              <a
                href={project.owner_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent-primary hover:underline mt-1 inline-block font-medium"
              >
                @{project.owner_login}
              </a>
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <p className="mb-5 text-sm text-text-secondary leading-relaxed">
              {project.description}
            </p>
          )}

          {/* GitHub Link Button */}
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-hover px-5 py-3 text-sm font-bold text-white shadow-lg shadow-accent-primary/30 transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <ExternalLink className="h-4 w-4" />
            View on GitHub
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 border-b border-border-primary/30 p-6">
          <div className="rounded-2xl border border-border-primary/40 bg-gradient-to-br from-background-tertiary/60 to-background-secondary/60 p-5 backdrop-blur-sm hover:border-accent-primary/50 transition-colors duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="rounded-lg bg-accent-primary/20 p-2">
                <Star className="h-4 w-4 text-accent-primary" />
              </div>
              <span className="text-xs font-semibold text-text-muted">Stars</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {formatNumber(project.stars)}
            </p>
          </div>

          <div className="rounded-2xl border border-border-primary/40 bg-gradient-to-br from-background-tertiary/60 to-background-secondary/60 p-5 backdrop-blur-sm hover:border-accent-primary/50 transition-colors duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="rounded-lg bg-accent-primary/20 p-2">
                <GitFork className="h-4 w-4 text-accent-primary" />
              </div>
              <span className="text-xs font-semibold text-text-muted">Forks</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {formatNumber(project.forks)}
            </p>
          </div>

          <div className="rounded-2xl border border-border-primary/40 bg-gradient-to-br from-background-tertiary/60 to-background-secondary/60 p-5 backdrop-blur-sm hover:border-accent-primary/50 transition-colors duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="rounded-lg bg-accent-primary/20 p-2">
                <Eye className="h-4 w-4 text-accent-primary" />
              </div>
              <span className="text-xs font-semibold text-text-muted">Watchers</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {formatNumber(project.watchers)}
            </p>
          </div>

          <div className="rounded-2xl border border-border-primary/40 bg-gradient-to-br from-background-tertiary/60 to-background-secondary/60 p-5 backdrop-blur-sm hover:border-accent-primary/50 transition-colors duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="rounded-lg bg-accent-primary/20 p-2">
                <AlertCircle className="h-4 w-4 text-accent-primary" />
              </div>
              <span className="text-xs font-semibold text-text-muted">Issues</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {formatNumber(project.open_issues)}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-5 border-b border-border-primary/30 p-6">
          {/* Primary Language */}
          {project.primary_language && (
            <div className="flex items-center gap-3 rounded-xl bg-background-tertiary/40 p-4 border border-border-primary/30">
              <div className="rounded-lg bg-accent-primary/20 p-2">
                <Code2 className="h-5 w-5 text-accent-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted">Primary Language</p>
                <p className="text-sm font-bold text-text-primary mt-0.5">
                  {project.primary_language}
                </p>
              </div>
            </div>
          )}

          {/* Last Push */}
          {project.pushed_at_github && (
            <div className="flex items-center gap-3 rounded-xl bg-background-tertiary/40 p-4 border border-border-primary/30">
              <div className="rounded-lg bg-accent-primary/20 p-2">
                <Calendar className="h-5 w-5 text-accent-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted">Last Updated</p>
                <p className="text-sm font-bold text-text-primary mt-0.5">
                  {new Date(project.pushed_at_github).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Topics */}
        {project.topics && project.topics.length > 0 && (
          <div className="border-b border-border-primary/30 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-4 w-4 text-accent-primary" />
              <h3 className="text-sm font-bold text-text-primary">
                Topics
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-lg border border-border-primary/40 bg-gradient-to-br from-background-tertiary/60 to-background-secondary/60 px-3 py-1.5 text-xs font-semibold text-accent-primary hover:border-accent-primary/50 transition-colors duration-200"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages Breakdown */}
        {project.languages_breakdown && Object.keys(project.languages_breakdown).length > 0 && (
          <div className="border-b border-border-primary/30 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-accent-primary" />
              <h3 className="text-sm font-bold text-text-primary">
                Languages
              </h3>
            </div>
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
                    <div key={language} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text-secondary">{language}</span>
                        <span className="text-sm font-bold text-text-primary">
                          {percentage}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-background-tertiary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-hover transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* README Section */}
        <div className="p-6">
          <div className="mb-5 flex items-center gap-2">
            <div className="rounded-lg bg-accent-primary/20 p-2">
              <FileText className="h-4 w-4 text-accent-primary" />
            </div>
            <h3 className="text-base font-bold text-text-primary">README</h3>
          </div>
          {isLoadingReadme ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-accent-primary mb-3" />
                <p className="text-sm text-text-muted">Loading README...</p>
              </div>
            </div>
          ) : isErrorReadme ? (
            <div className="rounded-2xl border border-border-primary/40 bg-gradient-to-br from-red-500/5 to-red-600/5 p-8 text-center">
              <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />
              <p className="text-sm font-medium text-text-muted">
                Failed to load README
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-border-primary/30 bg-gradient-to-br from-background-tertiary/40 to-background-secondary/40 overflow-hidden">
              <ReadmeViewer markdownContent={readmeContent} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
