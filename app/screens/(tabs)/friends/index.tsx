import {View, Text, StyleSheet } from 'react-native';


export default function FriendsScreen() {
    return (
        <View style={styles.container}>
            <Text>Friends Page</Text>
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
