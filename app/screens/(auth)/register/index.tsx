import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Button,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import { useState } from "react";
import auth from '@react-native-firebase/auth';
import {useRouter} from "expo-router";

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSignUp = async () => {
        setLoading(true);
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            alert('Account created');
        } catch (e: any) {
            alert("Registration failed: " + e.message);
        } finally {
            setLoading(false);
        }
    }

    const handleBack = () => {
        router.back();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Registration</Text>
                <Text style={styles.description}>Start your journey with us now.</Text>
                <KeyboardAvoidingView behavior={'padding'}>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldText}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}
                            keyboardType='email-address'
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldText}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            value={password}
                            secureTextEntry={true}
                            onChangeText={setPassword}
                        />
                    </View>

                    {loading ? (<ActivityIndicator size='small' color='blue' />) : (
                        <View style={styles.signUpContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                                <Text style={styles.buttonText}>Create an account</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    backButton: {
        alignSelf: 'flex-start',
    },
    backButtonText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    contentContainer: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
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
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 5
    },
    description: {
        fontSize: 20,
        marginBottom: 20,
        color: 'gray'
    },
    fieldText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    fieldContainer: {
        marginVertical: 8
    },
    button: {
        backgroundColor: '#27272a',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        marginVertical: 16,
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
        alignItems: 'center',
    },
});
