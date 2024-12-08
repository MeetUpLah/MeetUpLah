import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    Button,
    ActivityIndicator,
    SafeAreaView, TouchableOpacity
} from 'react-native';
import { useState } from "react";
import auth from '@react-native-firebase/auth';
import {useRouter} from "expo-router";

export default function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleCreateAccount = () => {
        router.push('./register');
    }

    const handleSignIn = async () => {
        setLoading(true);
        try {
            await auth().signInWithEmailAndPassword(email, password);
            alert('Logged in');
        } catch (e: any) {
            alert("Login failed: " + e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Text style={styles.title}>Login</Text>
            <Text style={styles.description}>Your travel plans all in one app.</Text>

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
                    <>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                                <Text style={styles.buttonText}>Sign in</Text>
                            </TouchableOpacity>

                            <Text style={styles.normalText}>OR CONTINUE WITH</Text>

                            <View style={styles.signUpContainer}>
                                <Text style={styles.signUpText}>Don't have an account?</Text>
                                <TouchableOpacity onPress={handleCreateAccount}>
                                    <Text style={styles.signUpButton}>Sign up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
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
    buttonContainer: {
        alignItems: 'center',
    },
    normalText: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
    }
});
