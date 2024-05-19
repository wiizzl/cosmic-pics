import { create } from "zustand";

type DiscoverStoreType = {
    discover: apodData[];
    setDiscover: (discover: apodData[]) => void;
};

export const useDiscoverStore = create<DiscoverStoreType>((set) => ({
    discover: [],
    setDiscover: (newData) => {
        set((state) => ({ discover: [...state.discover, ...newData] }));
    },
}));
