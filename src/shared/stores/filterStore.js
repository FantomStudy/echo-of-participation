import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFilterStore = create(
  persist(
    (set) => ({
      filters: {
        filterType: "",
        id: "",
        course: "",
        sort: "all",
        customRange: "",
        filterLabel: "",
      },

      setFilters: (newFilters) => set({ filters: newFilters }),

      resetFilters: () =>
        set({
          filters: {
            filterType: "",
            id: "",
            course: "",
            sort: "all",
            customRange: "",
            filterLabel: "",
          },
        }),
    }),
    {
      name: "filter-storage",
    }
  )
);
