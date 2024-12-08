import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import firestore from '@react-native-firebase/firestore';

const Friends = () => {
  const router = useRouter();

  const addFriends = async () => {
    try {
      const friendsCollection = firestore().collection('Friends');
      console.log('in firestore collection')
      await 
      friendsCollection.add({name:'Jeremy simp', age:22});
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView>
      <Button title="Create new Clique" onPress={addFriends} />
    </SafeAreaView>
  );
}

export default Friends;