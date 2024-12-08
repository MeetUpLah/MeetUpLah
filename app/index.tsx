import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";

export default function WelcomeScreen() {

    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/screens/(auth)/login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Itinify</Text>
            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                <Text style={styles.description}>Get started!</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
   container: {
       marginHorizontal: 20,
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
   },
    input: {
        marginVertical: 4,
        height: 50,
        borderRadius: 4,
        borderWidth: 1,
        padding: 10,
        backgroundColor: `#fff`,
    },
    title: {
        fontSize: 54,
        fontWeight: 'bold',
        marginBottom: 20
    },
    description: {
        fontSize: 20,
        color: 'white'
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 4,
        marginTop: 10
    },
});
