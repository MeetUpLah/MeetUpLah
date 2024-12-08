import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import auth from "@react-native-firebase/auth";
import {Link, useRouter} from "expo-router";

export default function HomeScreen() {

    // Get the currently signed-in user
    const user = auth().currentUser;
    const router = useRouter();

    const handleAddTrip = () => {
        router.push("/screens/home/components/addTrip");
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome {user?.email}!</Text>
            <View style={{alignItems: "center"}}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => auth().signOut()}>
                    <Text style={styles.buttonText}> Sign out</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={handleAddTrip}>
                    <Text style={styles.buttonText}>Add Trip</Text>
                </TouchableOpacity>

                {/*<Link href="/screens/home/components/addTrip">Enter tab 1's stack</Link>*/}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 70,
        flex: 1,
        justifyContent: "flex-start"
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
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
