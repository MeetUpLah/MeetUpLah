import { View, Text, SafeAreaView, TextInput, Button, FlatList } from 'react-native'
import React, { useState } from 'react'
import createClique from './createClique'
import { useRouter } from 'expo-router'

export default function addClique() {
  const [userInput, setUserInput] = useState<string>('')
  const [groupName, setGroupName] = useState<string>('')
  const [list, setList] = useState<string[]>([])
  const router = useRouter();

  const handleAddList = () => {
    if(userInput.trim()) {
      setList((prevItems) => [...prevItems, userInput.trim()]);
      setUserInput('')
    }
  };

  return (
    <SafeAreaView>
      <Text>What is your group name</Text>
      <TextInput placeholder='Groupname' value={groupName} onChangeText={setGroupName} />
      <Text>Who do you want to add</Text>
      <TextInput placeholder='Friend' value={userInput} onChangeText={setUserInput}/>
      <Button title='Add Friend' onPress={handleAddList}/>
      <FlatList 
      data={list}
      keyExtractor={(item, index) => 
        index.toString()
      }
      renderItem={({item}) => (
        <Text>{item}</Text>
      )}
      />
      <Button
  title="Create Clique"
  onPress={async () => {
    try {
      await createClique(groupName, list, router);
      alert('Clique created successfully!');
    } catch (error:any) {
      alert(error.message);
    }
  }}
/>
    </SafeAreaView>
  )
}
