import {View, Text, SafeAreaView, TouchableOpacity} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";


export default function ViewLocationScreen() {

    const { country } = useLocalSearchParams<{country: string}>();
    const router = useRouter();

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>Go Back</Text>
            </TouchableOpacity>

            <Text>View Location Page</Text>
            <Text>{country}</Text>
        </SafeAreaView>
    );
}
