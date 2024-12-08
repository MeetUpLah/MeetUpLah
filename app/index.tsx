import { Text, StyleSheet, TouchableOpacity, SafeAreaView, View } from 'react-native';
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/screens/(auth)/login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Welcome to Itinify</Text>
                    <Text style={styles.description}>Your travel plans all in one app.</Text>
                </View>


                <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => router.push('/screens/(auth)/register')}>
                        <Text style={styles.signUpButton}>Sign up</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    titleContainer: {
        alignItems: 'flex-start',
        marginBottom: 16,
        width: 300
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        marginBottom: 24,
        color: '#696969',
    },
    button: {
        backgroundColor: '#27272a',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        marginBottom: 16,
        shadowOpacity: 0.2,
        width: 300,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signUpText: {
        fontSize: 14,
        marginRight: 8,
        color: '#696969',
    },
    signUpButton: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
});
