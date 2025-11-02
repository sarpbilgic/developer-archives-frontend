'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

/**
 * ClientProviders Component
 * 
 * This component wraps the entire application with necessary providers.
 * It must be a Client Component to use React Query.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to wrap
 */
export default function ClientProviders({ children }) {
  // Initialize QueryClient with useState to ensure it's created only once per component instance
  // This prevents creating a new client on every render
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Stale time: how long data is considered fresh (5 minutes)
        staleTime: 5 * 60 * 1000,
        // Cache time: how long unused data stays in cache (10 minutes)
        gcTime: 10 * 60 * 1000,
        // Retry failed requests once
        retry: 1,
        // Don't refetch on window focus by default (can be overridden per query)
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}


