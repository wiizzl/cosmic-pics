import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Tabs } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
    const [date, setDate] = useState(new Date());

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) setDate(selectedDate);
    };

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "white" }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerTitle: "APODs of the last 7 days",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: date,
                                    onChange,
                                    mode: "date",
                                    is24Hour: true,
                                });
                            }}
                        >
                            <FontAwesome className="mr-3" size={22} name="calendar-o" color="white" />
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({ color }) => <FontAwesome size={25} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="gallery"
                options={{
                    title: "Gallery",
                    headerTitleAlign: "center",
                    tabBarIcon: ({ color }) => <FontAwesome size={25} name="photo" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    headerTitleAlign: "center",
                    tabBarIcon: ({ color }) => <FontAwesome size={25} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
}
