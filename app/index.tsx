import {Text, View, StyleSheet, KeyboardAvoidingView, TextInput, Button, ActivityIndicator} from 'react-native';
import { useState } from "react";
import auth from '@react-native-firebase/auth';

export default function Index() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signUp = async () => {
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
                onChangeText={setPassword}
              />

           {loading ? (<ActivityIndicator size='small' color='blue' />) : (
                <>
                 <Button title='Create an account' onPress={signUp}/>
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
});
