import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {useRouter} from "expo-router";


export default function LocationsScreen() {

    const router = useRouter();

    const goToAddLocation = () => {
        router.push("/screens/locations/components/addLocation")
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Locations</Text>
            <Text style={styles.titleDesc}>All your favourite places in a single location.</Text>

            <TouchableOpacity style={styles.buttonContainer} onPress={goToAddLocation}>
                <Text style={styles.buttonText}>Go to Add Location</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: 20,
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        marginBottom: 5
    },
    titleDesc: {
        fontSize: 20,
        color: 'grey',
    },
    buttonContainer: {
        backgroundColor: 'black',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 110,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});
