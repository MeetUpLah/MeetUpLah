import { Link } from "expo-router"
import { StatusBar, StyleSheet, Text, View } from "react-native"

export default function App() {
    return (
        <View style={styles.container}>
        <Text>Itinify</Text>
        <Link href="/screens/(auth)/auth" style = {{color:'blue'}}>Go to Auth</Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },

})