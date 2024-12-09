import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRouter} from "expo-router";

export default function TripsScreen() {

    const router = useRouter();

    const handleAddTrip = () => {
        router.push("/screens/trips/components/addTrip");
    }

    return (
        <View style={styles.container}>
            <Text style={{fontWeight: "bold"}}>Trips Page</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleAddTrip}>
                <Text style={styles.buttonText}>Add Trip</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: 'black',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 110
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});
