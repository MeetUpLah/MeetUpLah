import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRouter} from "expo-router";
import firestore from "@react-native-firebase/firestore"
import {useEffect} from "react";
import auth from "@react-native-firebase/auth";



export default function AddTripScreen() {

    const router = useRouter();

    const getData = async () => {
        try {
            const tripDocument =  await firestore()
                .collection('trips')
                .doc('Me3FUeflX1yOAHsY1kR2').get();

            console.log(tripDocument.data());
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    };


    useEffect(() => {
        getData();

        console.log(auth().currentUser);
        console.log(auth().currentUser?.uid);
    }, []);


    return (
        <View style={styles.container}>
            <Text>Add Trip Page</Text>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>Go back</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
