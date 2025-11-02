'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText } from 'lucide-react';

/**
 * ReadmeViewer Component
 * 
 * Renders markdown content (README files) with proper styling.
 * Uses react-markdown with GitHub Flavored Markdown support.
 * 
 * @param {Object} props
 * @param {string} props.markdownContent - The raw markdown text to render
 */
export default function ReadmeViewer({ markdownContent }) {
  if (!markdownContent) {
    return (
      <div className="flex items-center justify-center p-8 text-center">
        <div>
          <FileText className="mx-auto mb-3 h-12 w-12 text-[var(--text-muted)]" />
          <p className="text-sm text-[var(--text-muted)]">
            No README available for this repository
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="markdown-content px-8 py-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom component overrides for better styling
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-primary)] hover:text-[var(--accent-hover)] underline"
            />
          ),
          code: ({ node, inline, ...props }) => {
            if (inline) {
              return (
                <code
                  {...props}
                  className="bg-[var(--background-tertiary)] text-[var(--accent-primary)] px-1.5 py-0.5 rounded text-sm font-mono"
                />
              );
            }
            return (
              <code
                {...props}
                className="block bg-[var(--background-tertiary)] text-[var(--text-primary)] p-4 rounded-lg overflow-x-auto font-mono text-sm"
              />
            );
          },
          pre: ({ node, ...props }) => (
            <pre
              {...props}
              className="bg-[var(--background-tertiary)] border border-[var(--border-primary)] rounded-lg p-4 overflow-x-auto my-4"
            />
          ),
          h1: ({ node, ...props }) => (
            <h1
              {...props}
              className="text-3xl font-bold text-[var(--text-primary)] mt-6 mb-4 pb-2 border-b border-[var(--border-primary)]"
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              {...props}
              className="text-2xl font-semibold text-[var(--text-primary)] mt-6 mb-3"
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              {...props}
              className="text-xl font-semibold text-[var(--text-primary)] mt-5 mb-2"
            />
          ),
          h4: ({ node, ...props }) => (
            <h4
              {...props}
              className="text-lg font-semibold text-[var(--text-primary)] mt-4 mb-2"
            />
          ),
          p: ({ node, ...props }) => (
            <p {...props} className="text-[var(--text-secondary)] mb-4 leading-relaxed" />
          ),
          ul: ({ node, ...props }) => (
            <ul {...props} className="list-disc list-inside mb-4 space-y-2 text-[var(--text-secondary)]" />
          ),
          ol: ({ node, ...props }) => (
            <ol {...props} className="list-decimal list-inside mb-4 space-y-2 text-[var(--text-secondary)]" />
          ),
          li: ({ node, ...props }) => (
            <li {...props} className="text-[var(--text-secondary)]" />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-[var(--accent-primary)] pl-4 my-4 italic text-[var(--text-secondary)]"
            />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                {...props}
                className="min-w-full border-collapse border border-[var(--border-primary)]"
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead {...props} className="bg-[var(--background-tertiary)]" />
          ),
          th: ({ node, ...props }) => (
            <th
              {...props}
              className="border border-[var(--border-primary)] px-4 py-2 text-left font-semibold text-[var(--text-primary)]"
            />
          ),
          td: ({ node, ...props }) => (
            <td
              {...props}
              className="border border-[var(--border-primary)] px-4 py-2 text-[var(--text-secondary)]"
            />
          ),
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="max-w-full h-auto rounded-lg my-4 border border-[var(--border-primary)]"
              loading="lazy"
            />
          ),
          hr: ({ node, ...props }) => (
            <hr {...props} className="my-6 border-[var(--border-primary)]" />
          ),
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}

