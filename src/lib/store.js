import { create } from 'zustand';

/**
 * Üç-sütunlu (three-pane) arayüzümüz için global durum (state) yönetimi.
 *
 * Bu store, uygulamanın farklı parçalarının birbiriyle konuşmasını sağlar:
 * 1. Header'daki Arama Çubuğu (SearchBar) -> `setSearchQuery`'yi çağırır.
 * 2. Orta Sütun (ResultsPane) -> `searchQuery`'yi dinler, `setSelectedProjectId`'yi çağırır.
 * 3. Sağ Sütun (DetailPane) -> `selectedProjectId`'yi dinler.
 */
export const useAppStore = create((set) => ({
  // --- STATE ---
  searchQuery: '',
  selectedProjectId: null,
  
  // Filter state
  filters: {
    language: '',
    minStars: '',
    topics: '',
  },
  
  // Pagination state
  currentPage: 1,
  pageSize: 12,

  // --- ACTIONS ---

  /**
   * Updates the search query from the header search bar.
   * Resets pagination to page 1 when a new search is made.
   * @param {string} query - The new search text.
   */
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

  /**
   * Updates the filters from the FiltersPane.
   * Resets pagination to page 1 when filters change.
   * @param {Object} filters - The new filter values.
   */
  setFilters: (filters) => set({ filters, currentPage: 1 }),

  /**
   * Updates a single filter value.
   * @param {string} key - The filter key (language, minStars, topics).
   * @param {string} value - The new value.
   */
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),

  /**
   * Clears all filters.
   */
  clearFilters: () => set({
    filters: { language: '', minStars: '', topics: '' },
    currentPage: 1
  }),

  /**
   * Sets the selected project ID to show details.
   * @param {number | null} projectId - The project ID to display.
   */
  setSelectedProjectId: (projectId) => set({ selectedProjectId: projectId }),

  /**
   * Clears the selected project (closes the detail pane).
   */
  clearSelectedProject: () => set({ selectedProjectId: null }),

  /**
   * Sets the current page for pagination.
   * @param {number} page - The page number.
   */
  setCurrentPage: (page) => set({ currentPage: page }),

  /**
   * Sets the page size for pagination.
   * @param {number} size - The number of items per page.
   */
  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
}));