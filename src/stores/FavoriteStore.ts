import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FavoriteType = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
};

export const useFavoriteStore = create<FavoriteType>()(
  persist(
    (set, get) => ({
      favorites: [],
      isFavorite: (id: string) => get().favorites.includes(id),
      addFavorite: (id: string) =>
        set((state) => ({ favorites: [...get().favorites, id] })),
      removeFavorite: (id: string) =>
        set((state) => ({
          favorites: state.favorites.filter((favorite) => favorite !== id),
        })),
    }),
    {
      name: "favorite-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
