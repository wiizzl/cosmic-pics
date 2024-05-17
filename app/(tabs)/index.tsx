import { useFetch } from "@/lib/api";
import { Image } from "expo-image";
import { useCallback, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

interface fetchData {
    data: apiData;
    isLoading: boolean;
    error: boolean;
    refetch: () => void;
}

interface apiData {
    copyright: string;
    date: Date;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

export default function Home() {
    const { data, isLoading, error, refetch }: fetchData = useFetch("GET", "https://api.nasa.gov/planetary/apod");

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);

        refetch();

        setRefreshing(false);
    }, [setRefreshing, refetch]);

    console.log(data);

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className="bg-background">
                    {isLoading ? (
                        <></>
                    ) : error ? (
                        <Text>Erreur lors du chargement de l'image du jour. Vérifiez les status de l'API de la NASA</Text>
                    ) : (
                        <Image style={styles.image} source={{ uri: data?.hdurl }} contentFit="cover" transition={500} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 500,
        borderRadius: 20,
    },
});
