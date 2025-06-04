import { create } from "zustand";

type SearchType = {
    search: string;
    setSearch: (search: string) => void;
}

export const useSearchStore = create<SearchType>((set) => ({
    search: "",
    setSearch: (search: string) => set({ search }),
}))
