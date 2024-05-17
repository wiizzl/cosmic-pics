import { create } from "zustand";

type ApodStoreType = {
    weekApod: apodData[];
    setWeekApod: (weekApod: apodData[]) => void;
};

export const useApodStore = create<ApodStoreType>((set) => ({
    weekApod: [],
    setWeekApod: (weekApod) => set({ weekApod }),
}));
