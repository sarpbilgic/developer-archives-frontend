'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * ReadmeViewer Component - Modern Markdown Renderer
 * 
 * Renders markdown with beautiful styling and smooth animations.
 */
export default function ReadmeViewer({ markdownContent }) {
  if (!markdownContent) {
    return (
      <div className="px-8 py-12 text-center">
        <p className="text-sm text-text-muted">No README content available</p>
      </div>
    );
  }

  return (
    <div className="markdown-content px-8 py-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom heading styles
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold text-text-primary mb-6 mt-8 pb-3 border-b-2 border-border-primary/30" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold text-text-primary mb-5 mt-7 pb-2 border-b border-border-primary/20" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold text-text-primary mb-4 mt-6" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-semibold text-text-primary mb-3 mt-5" {...props} />
          ),
          // Paragraph
          p: ({ node, ...props }) => (
            <p className="text-sm text-text-secondary leading-relaxed mb-4" {...props} />
          ),
          // Links
          a: ({ node, ...props }) => (
            <a
              className="text-accent-primary font-medium hover:text-accent-hover hover:underline transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          // Lists
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-text-secondary" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-text-secondary" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-sm leading-relaxed" {...props} />
          ),
          // Code blocks
          code: ({ node, inline, ...props }) =>
            inline ? (
              <code
                className="rounded-lg bg-background-tertiary/60 px-2 py-1 text-xs font-mono text-accent-primary border border-border-primary/30"
                {...props}
              />
            ) : (
              <code
                className="block rounded-xl bg-background-tertiary/60 p-5 text-xs font-mono text-text-primary overflow-x-auto border border-border-primary/30 my-4"
                {...props}
              />
            ),
          pre: ({ node, ...props }) => (
            <pre className="rounded-xl bg-background-tertiary/60 p-5 overflow-x-auto border border-border-primary/30 my-4" {...props} />
          ),
          // Blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-accent-primary/50 bg-background-tertiary/40 pl-5 pr-4 py-3 my-4 italic text-text-secondary rounded-r-lg"
              {...props}
            />
          ),
          // Tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-border-primary/30 rounded-xl overflow-hidden" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-background-tertiary/60" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-3 text-left text-xs font-bold text-text-primary border-b border-border-primary/30" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-3 text-sm text-text-secondary border-b border-border-primary/20" {...props} />
          ),
          // Images
          img: ({ node, ...props }) => (
            <img className="rounded-xl my-6 max-w-full h-auto border border-border-primary/30 shadow-lg" {...props} />
          ),
          // Horizontal rule
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-t border-border-primary/30" {...props} />
          ),
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}
