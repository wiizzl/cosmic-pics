import { globals } from "@/styles/globals";
import "@/styles/globals.css";

import FontAwesome from "@expo/vector-icons/FontAwesome";
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

    if (isConnected) {
        return (
            <ThemeProvider value={{ dark: true, colors: globals.default }}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </ThemeProvider>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <View className="flex-1 items-center justify-center">
                <View className="flex-row gap-2.5">
                    <FontAwesome size={20} name="wifi" color="white" />
                    <Text className="mb-4 text-lg font-bold text-foreground">Connexion au WiFi requise</Text>
                </View>
                <View className="items-center">
                    <Text className="text-sm text-foreground">Veuillez vous connecter à un réseau WiFi pour continuer...</Text>
                    <Text className="text-sm text-foreground">Redémarrez l'application si vous êtes actuellement connecté.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
