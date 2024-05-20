import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text } from "react-native";

import Card from "@/components/card";
import { useApodStore } from "@/context/apod";
import { useFavStore } from "@/context/favorites";
import { useFetch } from "@/lib/api";

interface fetchData {
    data: apodData[];
    isLoading: boolean;
    error: boolean;
    refetch: () => void;
}

export default function Home() {
    const { initialize } = useFavStore();
    const { weekApod, setWeekApod } = useApodStore();

    const { data, isLoading, error, refetch }: fetchData = useFetch(
        "GET",
        "https://api.nasa.gov/planetary/apod",
        `&start_date=${moment().subtract(6, "days").format("YYYY-MM-DD")}&end_date=${moment().format("YYYY-MM-DD")}&thumbs=true`,
    );

    useEffect(() => {
        initialize();
    }, [initialize]);

    useEffect(() => {
        if (data) setWeekApod(data.sort((a, b) => moment(b.date).diff(moment(a.date))));
    }, [data, setWeekApod]);

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);

        refetch();

        setRefreshing(false);
    }, [setRefreshing, refetch]);

    function formatDate(dateString: Date) {
        const date = moment(dateString);
        const diff = moment().diff(date, "days");

        if (diff === 0) return "Today";
        if (diff === 1) return "Yesterday";
        return date.format("dddd");
    }

    return (
        <SafeAreaView className="mx-3 flex-1">
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {isLoading ? (
                    <ActivityIndicator size="large" color="white" />
                ) : error ? (
                    <Text className="text-foreground">Error loading images. Check NASA API status.</Text>
                ) : weekApod ? (
                    <>
                        <Card item={weekApod[0]} height={450} legend={formatDate(weekApod[0]?.date)} />
                        {weekApod.slice(1).map((item: apodData, index: number) => (
                            <Card item={item} height={130} legend={formatDate(item?.date)} key={index} />
                        ))}
                    </>
                ) : (
                    <Text className="text-foreground">Error loading images, please restart the application.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
