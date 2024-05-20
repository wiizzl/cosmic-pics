import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ActivityIndicator, Dimensions, FlatList, Pressable, SafeAreaView, Text, View } from "react-native";

import { useApodStore } from "@/context/apod";
import { useFetch } from "@/lib/api";

interface fetchData {
    data: apodData[];
    isLoading: boolean;
    error: boolean;
    refetch: () => void;
}

export default function Discover() {
    const { setSelectedDate } = useApodStore();

    const headerHeight = useHeaderHeight();
    const tabHeight = useBottomTabBarHeight();
    const height = Dimensions.get("window").height - tabHeight + headerHeight;

    const { data, isLoading, error, refetch }: fetchData = useFetch(
        "GET",
        "https://api.nasa.gov/planetary/apod",
        `&count=20&thumbs=true`,
    );

    return (
        <SafeAreaView className="flex-1">
            <View style={{ width: Dimensions.get("window").width, height: height }}>
                {isLoading ? (
                    <View style={{ paddingTop: headerHeight }}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                ) : error ? (
                    <Text className="text-foreground">Error loading images. Check NASA API status.</Text>
                ) : data ? (
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }: { item: apodData }) => (
                            <Pressable
                                onPress={() => {
                                    setSelectedDate(item?.date);
                                    router.push("/details");
                                }}
                            >
                                <View>
                                    <Image
                                        source={{ uri: item?.media_type === "image" ? item?.hdurl : item?.thumbnail_url }}
                                        style={{ width: "100%", height: height }}
                                        contentFit="cover"
                                        transition={200}
                                    />
                                </View>
                            </Pressable>
                        )}
                        keyExtractor={(item) => item?.date.toString() + Math.random().toString()}
                        pagingEnabled
                        onEndReached={refetch}
                    />
                ) : (
                    <Text className="text-foreground">Error loading images, please restart the application.</Text>
                )}
            </View>
        </SafeAreaView>
    );
}
