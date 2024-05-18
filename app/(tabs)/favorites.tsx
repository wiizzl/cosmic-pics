import moment from "moment";
import { SafeAreaView, ScrollView, Text } from "react-native";

import Card from "@/components/card";

import { useFavStore } from "@/context/favorites";

export default function Favorites() {
    const { favorites } = useFavStore();

    return (
        <SafeAreaView className="mx-3 flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                {favorites.length > 0 ? (
                    <>
                        {favorites.map((item: apodData, index: number) => (
                            <Card item={item} height={100} legend={moment(item?.date).format("DD/MM/YY")} key={index} />
                        ))}
                    </>
                ) : (
                    <Text className="text-foreground">You have not added any favorites...</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
