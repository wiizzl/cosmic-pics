import { FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useApodStore } from "@/context/apod";
import { useFavStore } from "@/context/favorites";
import { useFetch } from "@/lib/api";

interface fetchData {
    data: apodData;
    isLoading: boolean;
    error: boolean;
    refetch: () => void;
}

export default function Details() {
    const { addFavorite, removeFavorite, favorites } = useFavStore();

    const { selectedDate } = useApodStore();

    const { data, isLoading, error, refetch }: fetchData = useFetch(
        "GET",
        "https://api.nasa.gov/planetary/apod",
        `&date=${moment(selectedDate).format("YYYY-MM-DD")}`,
    );

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    useEffect(() => {
        if (data) setIsFavorite(favorites.some((fav: apodData) => fav.date === data?.date));
    }, [data, favorites]);

    const lastSelectedDate = useRef(selectedDate);
    useEffect(() => {
        if (lastSelectedDate.current !== selectedDate) {
            lastSelectedDate.current = selectedDate;
            refetch();
        }
    }, [selectedDate, refetch, lastSelectedDate]);

    const downloadFile = async (fileUri: string, fileTitle: string) => {
        function getFileExtension(url: string) {
            const pathname = new URL(url).pathname;
            const filename = pathname.split("/").pop();
            if (filename) return filename.split(".").pop();
        }

        try {
            const result = await FileSystem.downloadAsync(
                fileUri,
                FileSystem.documentDirectory + fileTitle.toLocaleLowerCase().replace(/\s/g, "") + "." + getFileExtension(fileUri),
            );
            if (result.status === 200) {
                console.log("Successfully downloaded file to :", result.uri);
            } else {
                console.log("Failed to download file with status code: ", result.status);
            }
        } catch (error) {
            console.log("Error while downloading file: ", error);
        }
    };

    return (
        <SafeAreaView className="mx-3 flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="white" />
                ) : error ? (
                    <Text className="text-foreground">
                        Erreur lors du chargement des images. Vérifiez les status de l'API de la NASA.
                    </Text>
                ) : data ? (
                    <View className="flex gap-3">
                        {data?.media_type === "image" ? (
                            <Image
                                style={{ width: "100%", height: 300, borderRadius: 10 }}
                                source={{ uri: data?.url }}
                                contentFit="fill"
                                transition={200}
                            />
                        ) : (
                            <Text className="text-foreground">The APOD of that day was not an image...</Text>
                        )}
                        <View className="flex-row justify-between">
                            <Text className="text-lg font-bold text-foreground">{data?.title}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    if (isFavorite) {
                                        const index = favorites.findIndex((fav: apodData) => fav.date === data?.date);
                                        removeFavorite(index);
                                    } else {
                                        addFavorite(data as apodData);
                                    }
                                    setIsFavorite(!isFavorite);
                                }}
                            >
                                <FontAwesome size={20} name={isFavorite ? "star" : "star-o"} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                className="items-center rounded-xl bg-secondary p-2"
                                onPress={() => downloadFile(data?.hdurl, data?.title)}
                            >
                                <Text className="text-foreground">Download image</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex gap-1">
                            <Text className="text-muted-foreground">{data?.explanation}</Text>
                            <Text className="text-sm text-muted-foreground">Credit : {data?.copyright}</Text>
                        </View>
                    </View>
                ) : (
                    <Text className="text-foreground">
                        Erreur lors du chargement des images, veuillez redémarrer l'application.
                    </Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
