import { globals } from "@/styles/globals";
import "@/styles/globals.css";

import { FontAwesome } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function RootLayout() {
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected !== null) {
                setIsConnected(state.isConnected);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <ThemeProvider value={{ dark: true, colors: globals.default }}>
            {isConnected ? (
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            ) : (
                <SafeAreaView className="flex-1 bg-background">
                    <View className="flex-1 items-center justify-center">
                        <View className="flex-row gap-2.5">
                            <FontAwesome size={20} name="wifi" color="white" />
                            <Text className="mb-4 text-lg font-bold text-foreground">WiFi connexion required</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-sm text-foreground">Please connect to a WiFi to continue...</Text>
                            <Text className="text-sm text-foreground">Restart the app if you are actually connected</Text>
                        </View>
                    </View>
                </SafeAreaView>
            )}
        </ThemeProvider>
    );
}
