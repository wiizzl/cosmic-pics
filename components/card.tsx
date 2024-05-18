import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { useApodStore } from "@/context/apod";

export default function Card({ item, height, legend }: { item: apodData; height: number; legend: string }) {
    const { setSelectedDate } = useApodStore();

    return (
        <View style={{ marginBottom: 18 }}>
            {item?.media_type === "image" ? (
                <TouchableOpacity
                    onPress={() => {
                        setSelectedDate(new Date(item?.date));
                        router.push("/details");
                    }}
                >
                    <Image
                        style={{ width: "100%", borderRadius: 10, height: height }}
                        source={{ uri: item?.hdurl }}
                        contentFit="cover"
                        transition={200}
                    />
                    <Text
                        className="text-foreground"
                        style={{
                            position: "absolute",
                            top: 5,
                            left: 5,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            paddingHorizontal: 5,
                            paddingVertical: 3,
                            borderRadius: 5,
                        }}
                    >
                        {legend}
                    </Text>
                </TouchableOpacity>
            ) : (
                <Text className="text-foreground">The APOD of that day was not an image...</Text>
            )}
        </View>
    );
}
