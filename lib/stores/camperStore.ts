import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Camper } from '@/types/camper';

interface CamperFilters {
  location: string;
  form: string;
  amenities: string[];
  engine: string;
  transmission: string;
}

interface CampersState {
  campers: Camper[];
  filteredCampers: Camper[];
  isLoading: boolean;
  error: string | null;

  filters: CamperFilters;
  page: number;
  hasMore: boolean;

  favorites: string[];

  setCampers: (campers: Camper[]) => void;
  appendCampers: (campers: Camper[]) => void;
  setPage: (page: number) => void;
  setHasMore: (value: boolean) => void;

  setFilteredCampers: (campers: Camper[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  setFilters: (filters: CamperFilters) => void;
  resetFilters: () => void;

  toggleFavorite: (camperId: string) => void;
  isFavorite: (camperId: string) => boolean;

  clearSearchResults: () => void;
}

export const initialFilters: CamperFilters = {
  location: '',
  form: '',
  amenities: [],
  engine: '',
  transmission: '',
};

export const useCampersStore = create<CampersState>()(
  persist(
    (set, get) => ({
      campers: [],
      filteredCampers: [],
      isLoading: false,
      error: null,
      filters: initialFilters,
      page: 1,
      hasMore: true,
      favorites: [],

      setCampers: (campers) => set({ campers }),

      appendCampers: (campers) => set({ campers }),

      setPage: (page) => set({ page }),

      setHasMore: (value) => set({ hasMore: value }),

      setFilteredCampers: (campers) => set({ filteredCampers: campers }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearSearchResults: () => set({ filteredCampers: [], campers: [] }),

      setFilters: (filters) => set({ filters }),

      resetFilters: () => set({ filters: initialFilters }),

      toggleFavorite: (camperId) => {
        const { favorites } = get();
        const isFav = favorites.includes(camperId);

        set({
          favorites: isFav
            ? favorites.filter((id) => id !== camperId)
            : [...favorites, camperId],
        });
      },

      isFavorite: (camperId) => {
        return get().favorites.includes(camperId);
      },
    }),
    {
      name: 'campers-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    },
  ),
);
