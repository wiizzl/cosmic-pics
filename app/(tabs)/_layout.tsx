import { Feather, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Tabs, router } from "expo-router";
import moment from "moment";
import { useState } from "react";
import { Alert, Share, TouchableOpacity } from "react-native";

import { useApodStore } from "@/context/apod";
import { useFavStore } from "@/context/favorites";

export default function TabLayout() {
    const { clearFavorites } = useFavStore();
    const { selectedDate, setSelectedDate } = useApodStore();

    const [show, setShow] = useState<boolean>(false);

    const calendarIcon = {
        headerRight: () => (
            <>
                <TouchableOpacity onPress={() => setShow(true)}>
                    <FontAwesome className="mr-4" size={22} name="calendar-o" color="white" />
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        maximumDate={new Date()}
                        minimumDate={new Date(1995, 5, 16)}
                        onChange={(event: DateTimePickerEvent, selectedDate: Date | undefined) => {
                            setShow(false);
                            if (selectedDate !== undefined && event.type !== "dismissed") {
                                setSelectedDate(selectedDate);
                                router.push("/details");
                            }
                        }}
                        themeVariant="dark"
                        positiveButton={{ label: "Confirm", textColor: "blue" }}
                        negativeButton={{ label: "Cancel", textColor: "red" }}
                    />
                )}
            </>
        ),
    };

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "white" }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerTitle: "APODs of the last 7 days",
                    tabBarIcon: ({ color }) => <Ionicons size={25} name="planet" color={color} />,
                    ...calendarIcon,
                }}
            />
            <Tabs.Screen
                name="discover"
                options={{
                    title: "Discover",
                    headerTransparent: true,
                    tabBarIcon: ({ color }) => <FontAwesome size={25} name="eye" color={color} />,
                    ...calendarIcon,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: "Favorites",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    "Delete all your favorites ?",
                                    "This action is irreversible.",
                                    [
                                        { text: "Cancel", style: "cancel" },
                                        { text: "Confirm", onPress: clearFavorites, style: "destructive" },
                                    ],
                                    { cancelable: false },
                                );
                            }}
                        >
                            <MaterialIcons className="mr-3" size={25} name="phonelink-erase" color="white" />
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({ color }) => <FontAwesome size={25} name="photo" color={color} />,
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: "About",
                    tabBarIcon: ({ color }) => <Feather size={25} name="info" color={color} />,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                Share.share({
                                    message:
                                        "Cosmic Pics is an innovative app that utilizes NASA's APOD (Astronomy Picture of the Day) API to display images in a smart and engaging way. With a user-friendly interface, you can easily browse APOD images using a calendar, or get lost in an infinite scrolling feed, similar to a famous app that allow you to infinite scroll.",
                                });
                            }}
                        >
                            <Feather className="mr-3" size={22} name="share" color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tabs.Screen
                name="details"
                options={{
                    title: moment(selectedDate).format("MMMM DD - YYYY"),
                    headerTitleAlign: "center",
                    href: null,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Feather className="ml-3" size={22} name="arrow-left" color="white" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tabs>
    );
}
