import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationProp,  ParamListBase } from '@react-navigation/native';

type NavType = NavigationProp<ParamListBase>;

export default function Home({navigation}: {navigation: NavType}) {
  const [user, setUser] = useState("User");
  useEffect(() => {
    if(!user) {
      setUser("user")
    }
  }, [user])
  const navigate = (destination: string) => () => navigation.navigate(destination)
  const navigateTodo = navigate("Counter");
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <TextInput 
        placeholder='type username'
        onChangeText={newText => setUser(newText)}
      />
      <Text style={styles.greetText}>Hello {user}!</Text>
      <Button title="my todo lists" onPress={navigateTodo}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetText: {
    color: "orange",
    fontSize: 29,
  }
});
