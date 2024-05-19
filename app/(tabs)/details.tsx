import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

import { useApodStore } from "@/context/apod";
import { useFavStore } from "@/context/favorites";
import { useFetch } from "@/lib/api";
import { getYoutubeVideoId } from "@/lib/utils";

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
        `&date=${moment(selectedDate).format("YYYY-MM-DD")}&thumbs=true`,
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

    const downloadImage = async (uri: string) => {
        try {
            // Request device storage access permission
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === "granted") {
                await MediaLibrary.saveToLibraryAsync(uri);

                console.log("Image successfully saved");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView className="mx-3 flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="white" />
                ) : error ? (
                    <Text className="text-foreground">Error loading images. Check NASA API status.</Text>
                ) : data ? (
                    <View className="flex gap-3">
                        {data?.media_type === "image" ? (
                            <>
                                <Image
                                    style={{ width: "100%", height: 300, borderRadius: 10 }}
                                    source={{ uri: data?.url }}
                                    contentFit="fill"
                                    transition={200}
                                />
                                <TouchableOpacity
                                    className="items-center rounded-xl bg-secondary p-2"
                                    onPress={() => downloadImage(data?.hdurl)}
                                >
                                    <Text className="text-foreground">Download image</Text>
                                </TouchableOpacity>
                            </>
                        ) : data?.media_type === "video" ? (
                            <>
                                <YoutubePlayer height={210} videoId={getYoutubeVideoId(data?.url)} />
                                <TouchableOpacity
                                    className="items-center rounded-xl bg-secondary p-2"
                                    onPress={() => Linking.openURL(data?.url)}
                                >
                                    <Text className="text-foreground">Open video in YouTube</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <Text className="text-foreground">Unable to display APOD for this day.</Text>
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
                        <View className="flex gap-1">
                            <Text className="text-muted-foreground">{data?.explanation}</Text>
                            {data?.copyright && <Text className="text-sm text-muted-foreground">Credit : {data?.copyright}</Text>}
                        </View>
                    </View>
                ) : (
                    <Text className="text-foreground">Error loading images, please restart the application.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
