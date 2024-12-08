import {View, Text, StyleSheet } from 'react-native';


export default function LocationsScreen() {
    return (
        <View style={styles.container}>
            <Text>Locations Page</Text>
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
