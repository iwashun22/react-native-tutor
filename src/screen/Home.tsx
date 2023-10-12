import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationProp,  ParamListBase } from '@react-navigation/native';
import AnimatedComponent from '../components/Animation';

import { PageName } from '../pageNames';

type NavType = NavigationProp<ParamListBase>;

export default function Home({navigation}: {navigation: NavType}) {
  const [user, setUser] = useState("User");
  useEffect(() => {
    if(!user) {
      setUser("user")
    }
  }, [user])
  const navigate = useCallback((destination: PageName) => () => navigation.navigate(destination), []);
  const navigateTodo = useCallback(navigate('Counter'), []);
  const navigateCustomNav = useCallback(navigate('Navbar'), []);
  const navigateMyFlatList = useCallback(navigate('Flatlist'), []);
  const navigateMyTodo = useCallback(navigate('MyTodo'), []);
  return (
    <View style={styles.container}>
      <AnimatedComponent/>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <TextInput 
        placeholder='type username'
        onChangeText={newText => setUser(newText)}
      />
      <Text style={styles.greetText}>Hello {user}!</Text>
      <Button title="my counter" onPress={navigateTodo}/>
      <Button title="custom navbar" onPress={navigateCustomNav}/>
      <Button title="flat list" onPress={navigateMyFlatList}/>
      <Button title="my todo" onPress={navigateMyTodo}/>
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
