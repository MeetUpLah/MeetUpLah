import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRoute} from "@react-navigation/core";
import {useRouter} from "expo-router";


export default function AddTripScreen() {


    const router = useRouter();


    return (
        <View style={styles.container}>
            <Text>Add Trip Page</Text>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>Go back</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
