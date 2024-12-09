import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {useRouter} from "expo-router";
import firestore from "@react-native-firebase/firestore"
import {useEffect, useState} from "react";
import auth from "@react-native-firebase/auth";

export default function AddTripScreen() {

    const router = useRouter();

    const [name, setName] = useState('');
    const [accommodation, setAccommodation] = useState('');
    const [flight, setFlight] = useState('');

    const currentUser = auth().currentUser;

    // Add trip by user id
    const handleAddTrip = () => {
        if (!currentUser) {
            console.error("No user logged in");
            return;
        }

        firestore()
            .collection('trips')
            .doc(currentUser.uid)
            .collection('userTrips') // Subcollection for the user's trips
            .add({ // Add a new trip document
                Name: name,
                Accommodation: accommodation,
                Flight: flight,
                createdAt: firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                console.log('Trip added!');
                setName('');
                setAccommodation('');
                setFlight('');
            })
            .catch((error) => {
                console.error('Error adding trip:', error);
            });
    };


    return (
        <View style={styles.container}>
            <Text>Add Trip Page</Text>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>Go back</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder='Name'
                value={name}
                onChangeText={setName}
                keyboardType='email-address'
            />

            <TextInput
                style={styles.input}
                placeholder='Accommodation'
                value={accommodation}
                onChangeText={setAccommodation}
                keyboardType='email-address'
            />
            <TextInput
                style={styles.input}
                placeholder='Flight'
                value={flight}
                onChangeText={setFlight}
                keyboardType='email-address'
            />

            <TouchableOpacity onPress={handleAddTrip}>
                <Text>Add</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderRadius: 4,
        borderWidth: 1,
        padding: 10,
        backgroundColor: `#fff`,
        width: 300
    },
});
