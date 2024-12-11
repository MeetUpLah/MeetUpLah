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
        name="components/addClique"
        options={{ title: "Add Clique" }}
      />
      <Stack.Screen
        name="components/addFriends"
        options={{ title: "AddFriends" }}
      />
      <Stack.Screen
        name="components/cliqueMembers"
        options={{ title: "Members" }}
      />
    </Stack>
  );
};

export default FriendLayout;
