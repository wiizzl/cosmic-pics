import { Image } from "expo-image";
import { router } from "expo-router";
import { Dimensions, FlatList, Pressable, SafeAreaView, View } from "react-native";

import { useApodStore } from "@/context/apod";
import { useDiscoverStore } from "@/context/discover";

interface fetchData {
    data: apodData[];
    isLoading: boolean;
    error: boolean;
    refetch: () => void;
}

export default function Discover() {
    const LIMIT = 10;

    const { setSelectedDate } = useApodStore();
    const { discover, setDiscover } = useDiscoverStore();

    return (
        <SafeAreaView className="flex-1">
            {discover && (
                <FlatList
                    data={discover}
                    renderItem={({ item }: { item: apodData }) => (
                        <View style={{ width: Dimensions.get("screen").width, height: 645 }}>
                            <Pressable
                                onPress={() => {
                                    setSelectedDate(item?.date);
                                    router.push("/details");
                                }}
                            >
                                <Image
                                    source={{ uri: item?.media_type === "image" ? item?.url : item?.thumbnail_url }}
                                    style={{ width: "100%", height: "100%" }}
                                    contentFit="contain"
                                />
                            </Pressable>
                        </View>
                    )}
                    keyExtractor={(item) => item?.date.toString() + Math.random().toString()}
                    pagingEnabled
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}
