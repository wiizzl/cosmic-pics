import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "white" }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesome size={25} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="gallery"
                options={{
                    title: "Galerie",
                    tabBarIcon: ({ color }) => <FontAwesome size={25} name="photo" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Paramètres",
                    tabBarIcon: ({ color }) => <FontAwesome size={25} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
}
