'use client';

import { useAppStore } from '@/lib/store';
import { Star, GitFork, Code2, ExternalLink, TrendingUp } from 'lucide-react';

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
      className={`group relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-2xl ${
        isSelected
          ? 'border-accent-primary bg-gradient-to-br from-background-tertiary to-background-secondary shadow-xl shadow-accent-primary/20 ring-2 ring-accent-primary/30'
          : 'border-border-secondary/50 bg-gradient-to-br from-background-secondary to-background-tertiary hover:border-accent-primary hover:shadow-accent-primary/20'
      }`}
    >
      {/* Selected Indicator - Gradient Bar */}
      {isSelected && (
        <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-accent-primary via-accent-hover to-accent-primary"></div>
      )}

      {/* Header with Owner */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {project.owner_avatar_url && (
            <img
              src={project.owner_avatar_url}
              alt={`${project.owner_login} avatar`}
              className="h-12 w-12 shrink-0 rounded-xl border-2 border-border-primary/50 ring-2 ring-background-tertiary shadow-lg"
            />
          )}
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-base text-text-primary group-hover:text-accent-primary transition-colors duration-200">
              {project.full_name}
            </h3>
            <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
              <span>@{project.owner_login}</span>
            </p>
          </div>
        </div>

        {/* External Link */}
        <a
          href={project.github_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 rounded-lg p-2 text-text-muted transition-all duration-200 hover:bg-background-tertiary hover:text-accent-primary"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Description */}
      {project.description && (
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>
      )}

      {/* Stats Row */}
      <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
        {/* Stars */}
        <div className="flex items-center gap-1.5 rounded-lg bg-background-tertiary/50 px-2.5 py-1.5">
          <Star className="h-4 w-4 fill-accent-primary text-accent-primary" />
          <span className="font-semibold text-text-primary">{formatStars(project.stars)}</span>
        </div>

        {/* Language */}
        {project.primary_language && (
          <div className="flex items-center gap-1.5 rounded-lg bg-background-tertiary/50 px-2.5 py-1.5">
            <Code2 className="h-4 w-4" />
            <span className="font-medium">{project.primary_language}</span>
          </div>
        )}

        {/* Similarity Score 
        {project.similarity && (
          <div className="ml-auto flex items-center gap-1 rounded-full bg-gradient-to-r from-accent-primary/20 to-accent-hover/20 px-3 py-1 ring-1 ring-accent-primary/30">
            <TrendingUp className="h-3 w-3 text-accent-primary" />
            <span className="text-xs font-bold text-accent-primary">
              {Math.round(project.similarity * 100)}%
            </span>
          </div>
        )}*/}
      </div>

      {/* Topics */}
      {project.topics && project.topics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="rounded-lg bg-background-tertiary/60 px-3 py-1.5 text-xs font-medium text-text-secondary border border-border-primary/30 hover:border-accent-primary/50 hover:text-accent-primary transition-colors duration-200"
            >
              {topic}
            </span>
          ))}
          {project.topics.length > 3 && (
            <span className="rounded-lg px-3 py-1.5 text-xs font-medium text-text-muted">
              +{project.topics.length - 3} more
            </span>
          )}
        </div>
      )}
    </article>
  );
}
