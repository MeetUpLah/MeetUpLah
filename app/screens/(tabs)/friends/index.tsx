import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Menu from "./components/Menu";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function FriendsScreen() {
  const router = useRouter();
  const user = auth().currentUser;
  const email = user?.email;

  const [list, setList] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const handleAddClique = () => {
    router.push({
      pathname: "/screens/friends/components/addClique",
      params: { username: username },
    });
  };

  const handleOpenMenu = () => {
    setVisibility(true);
  };

  const fetchUser = async () => {
    try {
      const users = await firestore().collection("users").get();
      let fetchedusername = "";
      users.forEach((doc) => {
        const data = doc.data();
        if (email === data.email.toLowerCase()) {
          fetchedusername = data.username;
          console.log("fetched user" + fetchedusername);
          setUsername(fetchedusername);
          console.log(username);
        }
      });
      console.log(username);
    } catch (Error) {
      console.log("error in fetching username");
    }
  };

  const fetchCliques = async () => {
    try {
      setLoading(true);
      await fetchUser();
      const db = await firestore()
        .collection("cliques")
        .doc(username)
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
        await fetchUser();
        fetchCliques();
      };
      fetchData();
    }, [username])
  );

  return (
    <TouchableWithoutFeedback onPress={() => setVisibility(false)}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Cliques</Text>
          {visibility ? (
            <View style={styles.menuContainer}>
              <Menu
                menuItems={[
                  "Add Clique",
                  "Edit Clique",
                  "Add Friends",
                  "Show Friends",
                ]}
                menuFunctions={[handleAddClique]}
              />
            </View>
          ) : (
            <AntDesign
              name="bars"
              size={48}
              color="white"
              onPress={handleOpenMenu}
            />
          )}
        </View>
        {loading ? (
          <ActivityIndicator size={"small"} color={"white"} />
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
                    params: { groupName: item, username: username },
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102129",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    position: "relative",
    color: "white",
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
    backgroundColor: "#FFBBCC",
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
  menuContainer: {
    position: "absolute",
    top: 20,
    right: 0,
    zIndex: 100,
    backgroundColor: "black",
    color: "white",
  },
  list: {
    position: "absolute",
    top: 140,
    right: 50,
    zIndex: -1, // Set the list below the menu
  },
});
