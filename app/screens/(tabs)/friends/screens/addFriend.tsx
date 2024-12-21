import { Button, View, Text, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useLocalSearchParams, useRouter } from "expo-router";
import addFriendList from "../components/addFriendList";

const addFriend = () => {
  const [friend, setFriend] = useState("");
  const params = useLocalSearchParams();
  const uid = Array.isArray(params.uid) ? params.uid[0] : params.uid;
  const router = useRouter();

  return (
    <SafeAreaView>
      <Text>What is your friends name?</Text>
      <TextInput onChangeText={setFriend} value={friend} placeholder="Friend" />
      <Button
        onPress={() => addFriendList(uid, router, friend)}
        title="confirm"
      />
    </SafeAreaView>
  );
};

export default addFriend;
