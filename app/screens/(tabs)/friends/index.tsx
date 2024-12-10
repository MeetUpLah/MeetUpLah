import { useRouter } from 'expo-router';
import {View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

export default function FriendsScreen() {
    const router = useRouter();
    const [list, setList] = useState<string[]>([]);

    const handleAddClique = () => {
       router.push('/screens/friends/components/addClique') 
    }

    return (
        <View style={styles.container}>
            <Text>Clique Page</Text>
            <FlatList 
            data={list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
                <Text>{item}</Text>
            )}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={handleAddClique}>
            <Text style={styles.buttonText}>Add Clique</Text>
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
