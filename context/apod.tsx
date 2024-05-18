import { create } from "zustand";

type ApodStoreType = {
    selectedDate: Date;
    weekApod: apodData[];

    setSelectedDate: (selectedDate: Date) => void;
    setWeekApod: (weekApod: apodData[]) => void;
};

export const useApodStore = create<ApodStoreType>((set) => ({
    selectedDate: new Date(),
    weekApod: [],

    setSelectedDate: (selectedDate) => set({ selectedDate }),
    setWeekApod: (weekApod) => set({ weekApod }),
}));
