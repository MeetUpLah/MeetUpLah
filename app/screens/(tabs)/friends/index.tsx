import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function FriendsScreen() {
  const router = useRouter();
  const user = auth().currentUser;
  const uid = user?.uid;

  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddClique = () => {
    router.push({
      pathname: "/screens/friends/components/addClique",
      params: { uid: uid },
    });
  };

  const fetchCliques = async () => {
    try {
      setLoading(true);
      const db = await firestore()
        .collection("users")
        .doc(uid)
        .collection("groups")
        .get();
      const filteredCliques: string[] = [];
      db.forEach((doc) => {
        const data = doc.data();
        console.log(data.groupName);
        filteredCliques.push(data.groupName);
      });
      setList(filteredCliques);
      console.log("Clique data fetched");
    } catch (Error) {
      console.error("error in fetching");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        fetchCliques();
      };
      fetchData();
    }, [uid])
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
      {loading ? (
        <ActivityIndicator size={"small"} color={"blue"} />
      ) : (
        <FlatList
          data={list}
          keyExtractor={(data, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cliqueNameContainer}
              onPress={() => {
                router.push({
                  pathname: "/screens/friends/components/cliqueMembers",
                  params: { groupName: item, uid: uid },
                });
              }}
            >
              <Text style={styles.groupName}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      )}
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
