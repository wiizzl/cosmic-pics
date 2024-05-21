import { deviceName, osInternalBuildId } from "expo-device";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { version } from "@/package.json";

export default function Settings() {
    const info = [
        { value: deviceName, label: "Device name" },
        { value: osInternalBuildId, label: "Device ID" },
        { value: version, label: "Client version" },
    ];

    return (
        <SafeAreaView className="mx-3 flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="gap-4">
                    <View className="rounded-lg border border-border">
                        {info.map((item, index: number) => (
                            <View className={`p-4 ${index !== 0 && "border-t border-border"}`} key={index}>
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-foreground">{item.label} :</Text>
                                    <Text className="text-foreground">{item.value}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View className="rounded-lg border border-border p-4">
                        <Text className="text-center text-foreground">
                            Cosmic Pics, an innovative app that utilizes NASA's APOD (Astronomy Picture of the Day) API to display
                            images in a smart and engaging way. With a user-friendly interface, you can easily browse APOD images
                            using a calendar, or get lost in an infinite scrolling feed. In addition, our app allows you to mark
                            your favorite images as favorites, so you can easily access them at any time. Cosmic Pics is the
                            perfect tool for anyone interested in astronomy, or for those who simply want to discover the beauty
                            of our universe.
                        </Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-muted-foreground">with ❤️ by Pierre</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
