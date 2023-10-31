import React, { useEffect, useState, useCallback, ReactElement } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { NavigationProp,  ParamListBase } from '@react-navigation/native';
import AnimatedComponent from '../components/Animation';

import { PageName } from '../pageNames';

type NavType = NavigationProp<ParamListBase>;

export default function Home({navigation}: {navigation: NavType}) {
  const [user, setUser] = useState("User");
  useEffect(() => {
    if(!user) {
      setUser("User")
    }
  }, [user])
  const navigate = useCallback((destination: PageName) => () => navigation.navigate(destination), []);
  const navigateTodo = useCallback(navigate('Counter'), []);
  const navigateCustomNav = useCallback(navigate('Navbar'), []);
  const navigateMyFlatList = useCallback(navigate('Flatlist'), []);
  const navigateMyTodo = useCallback(navigate('MyTodo'), []);
  const navigateFlexBox = useCallback(navigate('FlexBox'), []);
  return (
    <View style={styles.container}>
      <AnimatedComponent/>
      <StatusBar style="auto" />
      <View style={{
        flex: 1/6,
        justifyContent: 'flex-end',
        marginBottom: 40
      }}>
      <TextInput 
        placeholder='type username'
        onChangeText={newText => setUser(newText)}
        />
      <Text style={styles.greetText}>Hello {user}!</Text>
      </View>
      <View
        style={{
          flex: 1/2,
          maxHeight: 300,
          padding: 20,
          backgroundColor: '#E8A737',
        }}
      >
        <MyCustomButtonList items={[
          { title: "my counter", navigation: navigateTodo },
          { title: "custom navbar", navigation: navigateCustomNav },
          { title: "flat list", navigation: navigateMyFlatList },
          { title: "my todos", navigation: navigateMyTodo },
          { title: "flex box", navigation: navigateFlexBox },
        ]}/>
      </View>
    </View>
  );
}

function MyCustomButtonList({ items }: { 
  items: Array<{ title: string, navigation: () => void }>
}): ReactElement {
  return (
    <FlatList 
      data={items}
      keyExtractor={item => item.title}
      contentContainerStyle={{ 
        backgroundColor: 'yellow',
      }}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.navigateLinkButton} onPress={item.  navigation}>
          <Text style={styles.navigateLinkText}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  )
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
  },
  navigateLinkButton: {
    backgroundColor: 'blue',
    margin: 10,
    padding: 8,
    borderRadius: 6,
  },
  navigateLinkText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'uppercase'
  }
});
