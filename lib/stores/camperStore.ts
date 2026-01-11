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

  favorites: string[];

  setCampers: (campers: Camper[]) => void;
  setFilteredCampers: (campers: Camper[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  setFilters: (filters: CamperFilters) => void;
  resetFilters: () => void;

  toggleFavorite: (camperId: string) => void;
  isFavorite: (camperId: string) => boolean;

  clearSearchResults: () => void;
}

const initialFilters: CamperFilters = {
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
      favorites: [],

      setCampers: (campers) => set({ campers }),

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
      }),
    },
  ),
);
