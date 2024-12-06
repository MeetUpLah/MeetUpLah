import {Stack, useRouter, useSegments} from "expo-router";
import {useEffect, useState} from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Index from "@/app/index";
import {ActivityIndicator, View} from "react-native";

export default function RootLayout() {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const router = useRouter();
    const segments = useSegments();

    // Handle user state changes
    const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
        console.log('onAuthStateChanged: ', user);
        setUser(user);

        if (initializing) {
            setInitializing(false);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, []);

    useEffect(() => {
        if (initializing) {
            return;
        }

        const inAuthGroup = segments[1] === '(auth)';

        if (user && !inAuthGroup) {
            router.replace('/screens/(auth)/home');
        } else if (!user && inAuthGroup) {
            router.replace('/');
        }

    }, [user, initializing]);



    // Shows loading screen when initializing
    if (initializing) {
        return (
            <View
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
                <ActivityIndicator size='large' color='blue' />
            </View>
        );
    }

    return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}}/>
        <Stack.Screen name={'screens/(auth)'} options={{ headerShown: false}}/>
      </Stack>
    );
}
