import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type FavStoreType = {
    favorites: apodData[];

    addFavorite: (apodData: apodData) => Promise<void>;
    removeFavorite: (index: number) => Promise<void>;
    clearFavorites: () => Promise<void>;
    initialize: () => Promise<void>;
};

export const useFavStore = create<FavStoreType>((set) => ({
    favorites: [],

    addFavorite: async (apodData) => {
        const favorites: apodData[] = JSON.parse((await AsyncStorage.getItem("favorites")) ?? "[]");
        const existingFav = favorites.find((fav) => fav.date === apodData.date);
        if (!existingFav) {
            favorites.push(apodData);
            await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
            set({ favorites });
        }
    },
    removeFavorite: async (index) => {
        const favorites: apodData[] = JSON.parse((await AsyncStorage.getItem("favorites")) ?? "[]");
        favorites.splice(index, 1);
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        set({ favorites });
    },
    clearFavorites: async () => {
        await AsyncStorage.removeItem("favorites");
        set({ favorites: [] });
    },
    initialize: async () => {
        const favorites: apodData[] = JSON.parse((await AsyncStorage.getItem("favorites")) ?? "[]");
        set({ favorites });
    },
}));
