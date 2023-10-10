import React, { useRef, useEffect, useCallback } from 'react';
import { Text, StyleSheet, Dimensions, Animated, TouchableOpacity, View } from 'react-native';
import Icon, { IconName } from './Icon';

import type { PageName } from '../CustomNavbar';

const pages: Array<{ pageName: PageName, icon: IconName }> = [
  { pageName: "one", icon: "home" },
  { pageName: "two", icon: "bookmark" },
  { pageName: "three", icon: "map" },
  { pageName: "four", icon: "facebook" },
]

export default function Sidebar({show, touchDisabled, setPageTarget, currentPage}: {
  show: boolean, 
  touchDisabled: boolean,
  setPageTarget: React.Dispatch<React.SetStateAction<PageName>>,
  currentPage: PageName
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
        {/* <NavigateLink pageName="one" icon="home" touchDisabled={touchDisabled} navigate={setPageTarget}/>
        <NavigateLink pageName="two" icon="bookmark" touchDisabled={touchDisabled} navigate={setPageTarget}/>
        <NavigateLink pageName="three" icon="map" touchDisabled={touchDisabled} navigate={setPageTarget}/>
        <NavigateLink pageName="four" icon="facebook" touchDisabled={touchDisabled} navigate={setPageTarget}/> */}
        {pages.map(({ pageName, icon }, index) => (
          <NavigateLink key={index} pageName={pageName} icon={icon} touchDisabled={touchDisabled} navigate={setPageTarget} highlight={pageName === currentPage}/>
        ))}
      </View>
    </Animated.ScrollView>
  )
}

function NavigateLink({pageName, icon, touchDisabled, navigate, highlight}: {
  pageName: PageName, 
  icon: IconName, 
  touchDisabled: boolean,
  navigate: React.Dispatch<React.SetStateAction<PageName>>,
  highlight: boolean}
){
  return (
    <TouchableOpacity 
      style={[style.navLink, highlight?style.highlight:null]} 
      onPress={() => {
        if(!touchDisabled) navigate(pageName);
      }}
    >
      <View style={style.iconBox}>
        <Icon iconName={icon} size={30} color="blue"/>
      </View>
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
    backgroundColor: '#E6E6E6',
    zIndex: 100,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  navLink: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 20,
  },
  highlight: {
    backgroundColor: 'white'
  },
  iconBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  linkText: {
    fontSize: 18,
    flex: 3,
    textAlign: 'center',
    marginRight: 20
  }
})