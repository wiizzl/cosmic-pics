import { Image } from "expo-image";
import moment from "moment";
import { Text, View } from "react-native";

export default function Card({ item, height }: { item: apodData; height: number }) {
    function formatDate(dateString: Date) {
        const date = moment(dateString, "YYYY-MM-DD");
        const diff = moment().diff(date, "days");

        if (diff === 0) return "Today";
        if (diff === 1) return "Yesterday";
        return date.format("DD/MM/YY");
    }

    return (
        <View className="relative mb-5">
            <Image
                style={{ width: "100%", height: height, borderRadius: 10 }}
                source={{ uri: item?.hdurl }}
                contentFit="cover"
                transition={200}
            />
            <View className="absolute left-2 top-2 rounded-xl bg-black/40 p-1">
                <Text className="text-foreground">{formatDate(item?.date)}</Text>
            </View>
        </View>
    );
}
