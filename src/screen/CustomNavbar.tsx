import React, { ReactElement, useState } from 'react';
import { View, StyleSheet, Dimensions, Button, Text, ScrollView } from 'react-native';

const pages: Array<{name: string, background: string, component: null | ReactElement}> = [
  { name: "one", background: "green", component: null },
  { name: "two", background: "blue", component: null },
  { name: "three", background: "red", component: null },
  { name: "four", background: "yellow", component: null },
  { name: "five", background: "orange", component: null }
]

export default function CustomNavbar(): ReactElement {
  const [pageTarget, setPageTarget] = useState("three");
  const [toggleDummy, setToggle] = useState(false);
  return (
    <View style={{ height: '100%' }}>
      { pages.map((page) => {
        if(page.name === pageTarget) return (
          // <ScrollView>
          <ScrollView 
            style={[
              style.fullscreenView, 
              { backgroundColor: page.background}
            ]}
            key={page.name}
          >
            <Text style={{color: 'white', fontSize: 28}}>{page.name}</Text>
            
              { page.component }
            
            <Button title="toggle dummy" onPress={() => setToggle(!toggleDummy)}/>
              { toggleDummy && <Dummy/> }
          </ScrollView>
          // </ScrollView>
        ) 
        return null
        }
      ) }
    </View>
  )
}

const style = StyleSheet.create({
  fullscreenView: {
    width: Dimensions.get('screen').width,
    minHeight: '100%'
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