import {Text, View, StyleSheet, KeyboardAvoidingView, TextInput, Button, ActivityIndicator} from 'react-native';
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


    const signIn = async () => {
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
        <View
            style={styles.container}
        >
            <Text style={styles.title}>Itinify</Text>
            <Text style={styles.description}>Your travel plans all in one app.</Text>
            <KeyboardAvoidingView behavior={'padding'}>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'

                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />

                {loading ? (<ActivityIndicator size='small' color='blue' />) : (
                    <>
                        <Button title='Create an account' onPress={handleCreateAccount}/>
                        <Button title='Sign In' onPress={signIn}/>
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
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
        fontSize: 58,
        fontWeight: 'bold',
        marginBottom: 20
    },
    description: {
        fontSize: 20,
        marginBottom: 20,
        color: 'gray'
    }
});
