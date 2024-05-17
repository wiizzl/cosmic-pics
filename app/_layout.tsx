import { globals } from "@/styles/globals";
import "@/styles/globals.css";

import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <ThemeProvider value={{ dark: true, colors: globals.default }}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ThemeProvider>
    );
}
