import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";

import Card from "@/components/card";
import { useApodStore } from "@/context/apod";
import { useFetch } from "@/lib/api";

interface fetchData {
    data: apodData[];
    isLoading: boolean;
    error: boolean;
    refetch: () => void;
}

export default function Home() {
    const { weekApod, setWeekApod } = useApodStore();

    const { data, isLoading, error, refetch }: fetchData = useFetch(
        "GET",
        "https://api.nasa.gov/planetary/apod",
        `&start_date=${moment().subtract(6, "days").format("YYYY-MM-DD")}&end_date=${moment().format("YYYY-MM-DD")}`,
    );

    useEffect(() => {
        if (data) setWeekApod(data.sort((a, b) => moment(b.date).diff(moment(a.date))));
    }, [data, setWeekApod]);

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);

        refetch();

        setRefreshing(false);
    }, [setRefreshing, refetch]);

    return (
        <SafeAreaView className="mx-3 flex-1 bg-background">
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className="bg-background">
                    {isLoading ? (
                        <ActivityIndicator size="large" color="white" />
                    ) : error ? (
                        <Text className="text-foreground">
                            Erreur lors du chargement des images. Vérifiez les status de l'API de la NASA
                        </Text>
                    ) : weekApod ? (
                        <>
                            <Card item={weekApod[0]} height={500} />
                            {weekApod.slice(1).map((item: apodData, index: number) => (
                                <Card item={item} height={150} key={index} />
                            ))}
                        </>
                    ) : (
                        <Text className="text-foreground">
                            Erreur lors du chargement des images, veuillez redémarrer l'application.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
