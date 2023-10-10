import React, { ReactElement, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, Dimensions, Button, Text, ScrollView } from 'react-native';

import { NavbarButton } from './components/NavbarButton';
import Sidebar from './components/Sidebar';

export const pageNameArr = ["one", "two", "three", "four", "five"] as const;
export type PageName = typeof pageNameArr[number];

const pages: ReadonlyArray<{name: PageName, background: string, Component: () => React.JSX.Element}> = [
  { name: "one", background: "green", Component: One },
  { name: "two", background: "blue", Component: () => <></> },
  { name: "three", background: "red", Component: () => <></> },
  { name: "four", background: "yellow", Component: () => <></> },
  { name: "five", background: "orange", Component: () => <></> }
];

export default function CustomNavbar(): ReactElement {
  const [pageTarget, setPageTarget] = useState<PageName>("one");
  const [toggleDummy, setToggle] = useState(false);
  return (
    <View style={{ height: '100%' }}>
      { displayPage({ pageTarget, setPageTarget, toggleDummy, setToggle}) }
    </View>
  )
}

function displayPage({pageTarget, setPageTarget, toggleDummy, setToggle}: {
  pageTarget: PageName,
  setPageTarget: React.Dispatch<React.SetStateAction<PageName>>,
  toggleDummy: boolean,
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}): ReactElement {
  const [showSideBar, setSideBarState] = useState<boolean>(false);
  const page = pages[ pages.findIndex(({name}) => name === pageTarget) ];
  const toggle = useCallback(() => {
    setSideBarState(state => !state)
  }, []);
  let touchX: number;
  useEffect(() => {
    setSideBarState(false);
  }, [pageTarget])
  return (
    <View
      onTouchStart={(e) => { touchX = e.nativeEvent.pageX }}
      onTouchEnd={(e) => {
        if(touchX - e.nativeEvent.pageX > 20) {
          console.log("Swipe left");
          if(showSideBar) toggle();
        }
      }}
    >
      <Sidebar show={showSideBar} setPageTarget={setPageTarget}/>
      <ScrollView 
        style={[
          style.fullscreenView, 
          { backgroundColor: page.background}
        ]}
        key={page.name}
      >
        <NavbarButton toggleSideBar={toggle}/>
        <Text style={{color: 'white', fontSize: 28}}>{page.name}</Text>
          <page.Component/>
        <Button title="toggle dummy" onPress={() => setToggle(!toggleDummy)}/>
          { toggleDummy && <Dummy/> }
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  fullscreenView: {
    width: Dimensions.get('screen').width,
    minHeight: Dimensions.get('screen').height
  }
})

const arr: Array<{
  component: () => React.JSX.Element,
  key: string | number
}> = [];

const Dummy: () => React.JSX.Element[] = () => {
  if(!arr.length) {
    for(let i=0; i<100; i++) {
      arr.push({
        component: () => (<Text>Dummy {i}</Text>),
        key: i
      })
    }
  }
  return arr.map(t => <t.component key={t.key}/>);
}


// ####### CHILD COMPONENTS
function One() {
  return (
    <View>
    </View>
  )
}

function Two() {
  return (
    <View>
    </View>
  )
}