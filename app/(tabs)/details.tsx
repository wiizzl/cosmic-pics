import { FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

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
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission request", "Permission to access media library is required !");
                return;
            }

            const documentDirectory = FileSystem.documentDirectory;

            if (!documentDirectory) {
                throw new Error("File system document directory is not available !");
            }

            const fileUri = documentDirectory + uri.split("/").pop();
            const { uri: localUri } = await FileSystem.downloadAsync(uri, fileUri);

            const asset = await MediaLibrary.createAssetAsync(localUri);
            await MediaLibrary.createAlbumAsync("Download", asset, false);

            Alert.alert("Image download", "Image downloaded successfully !");
        } catch (error) {
            console.error("Error downloading image :", error);
            Alert.alert("Image download", "Failed to download image.");
        }
    };

    function getYoutubeVideoId(url: string) {
        const regexp =
            /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})|^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/;

        if (!regexp.test(url)) throw new Error("Invalid URL");

        const match = url.match(regexp);
        if (match === null) throw new Error("Can't extract video ID");

        return match[1] || match[2];
    }

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
                            {data?.copyright && <Text className="text-sm text-muted-foreground">Credit : {data.copyright}</Text>}
                        </View>
                    </View>
                ) : (
                    <Text className="text-foreground">Error loading images, please restart the application.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
