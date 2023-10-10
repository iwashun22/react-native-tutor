import React, { useRef, useEffect, useCallback } from 'react';
import { Text, StyleSheet, Dimensions, Animated, TouchableOpacity, View } from 'react-native';
import Icon, { IconName } from './Icon';

import type { PageName } from '../CustomNavbar';

export default function Sidebar({show, setPageTarget}: {
  show: boolean, 
  setPageTarget: React.Dispatch<React.SetStateAction<PageName>>
}){
  const slideAnim = useRef(new Animated.ValueXY()).current;
  const hideLeft = -Dimensions.get('screen').width;
  // const hideLeft = -100;
  const moveToX = useCallback((x: number, speed=5) => {
    Animated.spring(slideAnim, {
      toValue: {x, y:0},
      speed,
      bounciness: 0,
      useNativeDriver: true
    }).start();
  }, [])
  useEffect(() => {
    console.log("move triggered")
    show ? moveToX(0) : moveToX(hideLeft);
  }, [show])
  useEffect(() => {
    console.log("This should not trigger twice");
    if(!show) moveToX(hideLeft, 0);
  }, [])
  return (
    <Animated.ScrollView 
      style={
        [style.container, {
          transform: [{translateX: slideAnim.x}]
        }]
      }
    >
      <Text style={style.headerText}>sidebar</Text>
      <View>
        <NavigateLink pageName="one" icon="home" navigate={setPageTarget}/>
        <NavigateLink pageName="two" icon="bookmark" navigate={setPageTarget}/>
        <NavigateLink pageName="three" icon="map" navigate={setPageTarget}/>
        <NavigateLink pageName="four" icon="facebook" navigate={setPageTarget}/>
      </View>
    </Animated.ScrollView>
  )
}

function NavigateLink({pageName, icon, navigate}: {
  pageName: PageName, 
  icon: IconName, 
  navigate: React.Dispatch<React.SetStateAction<PageName>>}
){
  return (
    <TouchableOpacity 
      style={style.navLink} 
      onPress={() => {
        navigate(pageName);
      }}
    >
      <Icon iconName={icon} size={30} color="blue" />
      <Text style={style.linkText}>{pageName}</Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    width: Dimensions.get('screen').width - 70,
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'white',
    zIndex: 100,
    paddingLeft: 20
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  navLink: {
    display: 'flex',
    flexDirection: 'row',
  },
  linkText: {
    
  }
})