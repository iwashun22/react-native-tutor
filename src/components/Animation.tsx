import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { Button, Text, Animated, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type Item = {
  name: string
}

const items: Array<Item> = [
  { name: "Apple" },
  { name: "Orange" },
  { name: "Lemon" }
]

export default function AnimatedComponent(): ReactElement {
  const [displayState, setDisplayState] = useState(false);
  const viewAnim = useRef(new Animated.ValueXY()).current;
  const handler: (item: Item) => void = (item) => {
    console.log(item.name)
  }
  const moveToRight = () => {
    Animated.spring(viewAnim, {
      toValue: {x: 100, y: 0},
      // speed: 200,
      useNativeDriver: true
    }).start();
  }
  const moveToOriginal = () => {
    Animated.spring(viewAnim, {
      toValue: {x: 0, y: 0},
      useNativeDriver: true
    }).start();
  }
  useEffect(() => {
    if(displayState) {
      moveToRight();
    } else {
      moveToOriginal();
    }
  }, [displayState])
  return (
    <Animated.View style={[
      style.navbar,
      {
        transform: [{translateX: viewAnim.x}]
      }
    ]}>
      <Button title="click me" onPress={() => setDisplayState(!displayState)}/>
      <FlatList 
        data={items}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handler(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </Animated.View>
  )
}

const style = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  navbarList: {
    display: 'flex',
    flexDirection: 'row'
  }
})