import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import firestore from "@react-native-firebase/firestore";

const cliqueMembers = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const groupName = Array.isArray(params.groupName)
    ? params.groupName[0]
    : params.groupName;
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;
  const [list, setList] = useState<string[]>([]);

  const fetchClique = async () => {
    try {
      const db = firestore()
        .collection("cliques")
        .doc(groupName)
        .collection("members");
      const snapshot = await db.get();
      const memberList: string[] = [];
      snapshot.forEach((shot) => {
        const data = shot.data();
        if (data.name) {
          memberList.push(data.name);
        }
      });
      setList(memberList);
      console.log("Data fetched");
    } catch (Error) {
      console.error("Error in fetching members");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchClique();
    }, [])
  );

  return (
    <SafeAreaView>
      <Button
        title="Add more friends?"
        onPress={() => {
          router.push({
            pathname: "/screens/friends/components/addFriends",
            params: { groupName: groupName, username: username },
          });
        }}
      />
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.Friends}>{item}</Text>}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Friends: {
    textAlign: "center",
    fontSize: 25,
    backgroundColor: "aquamarine",
    margin: 5,
    borderWidth: 2,
    paddingVertical: 20,
  },
  list: {
    marginTop: 30,
  },
});

export default cliqueMembers;
