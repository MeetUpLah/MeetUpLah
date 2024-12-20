import { Stack } from "expo-router";
import React from "react";

const FriendLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Friends" }}
      />
      <Stack.Screen
        name="screens/addClique"
        options={{ title: "Add Clique" }}
      />
      <Stack.Screen
        name="screens/addFriendsInClique"
        options={{ title: "AddFriends" }}
      />
      <Stack.Screen
        name="screens/cliqueMembers"
        options={{ title: "Members" }}
      />
      <Stack.Screen
        name="screens/Friendlist"
        options={{ title: "FriendList" }}
      />
    </Stack>
  );
};

export default FriendLayout;
