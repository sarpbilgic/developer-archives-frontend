import { create } from 'zustand';

export const useAppStore = create((set) => ({

  searchQuery: '',
  selectedProjectId: null,
  
  filters: {
    language: '',
    minStars: '',
    topics: '',
  },
  
  currentPage: 1,
  pageSize: 12,

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

  setFilters: (filters) => set({ filters, currentPage: 1 }),

  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),


  clearFilters: () => set({
    filters: { language: '', minStars: '', topics: '' },
    currentPage: 1
  }),

  setSelectedProjectId: (projectId) => set({ selectedProjectId: projectId }),


  clearSelectedProject: () => set({ selectedProjectId: null }),


  setCurrentPage: (page) => set({ currentPage: page }),


  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
}));