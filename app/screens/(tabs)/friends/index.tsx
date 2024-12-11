import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FriendsScreen() {
  const router = useRouter();

  const [list, setList] = useState<string[]>([]);
  const [reload, setreload] = useState(false);

  const handleAddClique = () => {
    router.push({
      pathname: "/screens/friends/components/addClique",
    });
  };

  const fetchCliques = async () => {
    try {
      const db = await firestore().collection("cliques").get();
      const filteredCliques: string[] = [];
      db.forEach((doc) => {
        const data = doc.data();
        if (data.name === "Bob") {
          filteredCliques.push(data.groupName);
        }
      });
      setList(filteredCliques);
      console.log("Data fetched");
    } catch (Error) {
      console.error("error in fetching");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCliques();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Clique Page</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleAddClique}
        >
          <Text style={styles.buttonText}>Add Clique</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={list}
        keyExtractor={(data, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cliqueNameContainer}
            onPress={() => {
              router.push({
                pathname: "/screens/friends/components/cliqueMembers",
                params: { groupName: item },
              });
            }}
          >
            <Text style={styles.groupName}>{item}</Text>
          </TouchableOpacity>
        )}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    position: "relative",
  },
  buttonContainer: {
    backgroundColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 100,
    justifyContent: "center",
    height: 64,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  cliqueNameContainer: {
    backgroundColor: "aquamarine",
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 50,
    width: 350,
    marginTop: 10,
    marginBottom: 10,
    height: 75,
    alignSelf: "center",
  },
  groupName: {
    fontSize: 30,
    fontWeight: 300,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    marginTop: 10,
  },
});
