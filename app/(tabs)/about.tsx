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
            </ScrollView>
        </SafeAreaView>
    );
}
