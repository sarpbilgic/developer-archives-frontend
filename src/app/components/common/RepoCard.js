'use client';

import { useAppStore } from '@/lib/store';
import { Star, GitFork, Code2, ExternalLink } from 'lucide-react';

/**
 * RepoCard Component
 * 
 * Displays a single repository search result as a card.
 * Clicking the card selects it and shows details in the DetailPane.
 * 
 * @param {Object} props
 * @param {Object} props.project - The repository data (SearchResultItem schema)
 */
export default function RepoCard({ project }) {
  const { setSelectedProjectId, selectedProjectId } = useAppStore();
  const isSelected = selectedProjectId === project.id;

  const handleClick = () => {
    setSelectedProjectId(project.id);
  };

  // Format star count (e.g., 1234 -> 1.2k)
  const formatStars = (stars) => {
    if (stars >= 1000) {
      return `${(stars / 1000).toFixed(1)}k`;
    }
    return stars.toString();
  };

  return (
    <article
      onClick={handleClick}
      className={`group relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[var(--accent-primary)]/10 ${
        isSelected
          ? 'border-[var(--accent-primary)] bg-[var(--background-tertiary)] shadow-md shadow-[var(--accent-primary)]/20'
          : 'border-[var(--border-secondary)] bg-[var(--background-secondary)] hover:border-[var(--accent-primary)]'
      }`}
    >
      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute left-0 top-0 h-full w-1.5 rounded-l-lg bg-[var(--accent-primary)]" />
      )}

      {/* Header with Owner Avatar and Name */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {project.owner_avatar_url && (
            <img
              src={project.owner_avatar_url}
              alt={`${project.owner_login} avatar`}
              className="h-11 w-11 flex-shrink-0 rounded-full border border-[var(--border-primary)]"
            />
          )}
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
              {project.full_name}
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {project.owner_login}
            </p>
          </div>
        </div>

        {/* External Link Icon */}
        <a
          href={project.github_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-shrink-0 rounded p-1 text-[var(--text-muted)] transition-colors hover:bg-[var(--background-tertiary)] hover:text-[var(--accent-primary)]"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Description */}
      {project.description && (
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          {project.description}
        </p>
      )}

      {/* Stats and Language */}
      <div className="flex items-center gap-5 text-sm text-[var(--text-muted)]">
        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <Star className="h-4 w-4 fill-[var(--accent-primary)] text-[var(--accent-primary)]" />
          <span className="font-medium">{formatStars(project.stars)}</span>
        </div>

        {/* Primary Language */}
        {project.primary_language && (
          <div className="flex items-center gap-1.5">
            <Code2 className="h-4 w-4" />
            <span>{project.primary_language}</span>
          </div>
        )}

        {/* Similarity Score (if available) */}
        {project.similarity && (
          <div className="ml-auto rounded-full bg-[var(--accent-primary)]/10 px-3 py-1 text-xs text-[var(--accent-primary)]">
            {Math.round(project.similarity * 100)}% match
          </div>
        )}
      </div>

      {/* Topics */}
      {project.topics && project.topics.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="rounded-md bg-[var(--background-tertiary)] px-3 py-1.5 text-xs text-[var(--text-secondary)] border border-[var(--border-primary)]"
            >
              {topic}
            </span>
          ))}
          {project.topics.length > 3 && (
            <span className="rounded-md px-3 py-1.5 text-xs text-[var(--text-muted)]">
              +{project.topics.length - 3} more
            </span>
          )}
        </div>
      )}
    </article>
  );
}

