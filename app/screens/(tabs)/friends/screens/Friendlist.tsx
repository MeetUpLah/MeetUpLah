import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Friendlist = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<string[]>([]);
  const params = useLocalSearchParams();
  const uid = Array.isArray(params.uid) ? params.uid[0] : params.uid;

  const fetchFriendList = async () => {
    setLoading(true);
    try {
      const doc = await firestore()
        .collection("users")
        .doc(uid)
        .collection("friends")
        .get();
      const memberList: string[] = [];
      doc.forEach((friend) => {
        const data = friend.data();
        if (data.username) {
          memberList.push(data.username);
        }
      });
      setList(memberList);
      console.log("friends list fetched");
    } catch (error: any) {
      console.error("unable to fetch friends list");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFriendList();
    }, [])
  );

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator size="small" color="blue" />
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      )}
    </SafeAreaView>
  );
};

export default Friendlist;
