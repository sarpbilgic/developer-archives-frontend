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

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Stale time: how long data is considered fresh (120 minutes)
        staleTime: 120 * 60 * 1000,
        // Cache time: how long unused data stays in cache (120 minutes)
        gcTime: 120 * 60 * 1000,
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


