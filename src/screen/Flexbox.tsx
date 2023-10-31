import React, { ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function FlexBox(): ReactElement {
  return (
    <View style={{height: '100%', width: '100%'}}>
      <Text style={styles.header}>container without flex</Text>
      <View style={styles.container}>
        <Items/>
      </View>
      <Text style={styles.header}>flexed container</Text>
      <View style={styles.containerFlex}>
        {/* When the container is flexed the children will also be flexed automatically */}
        <Items/>
      </View>
    </View>
  )
}

function Items(): ReactElement[] {
  const items: Array<{ [key: string]: keyof typeof styles }> = [
    { "One": 'violet' },
    { "Two": 'gold' },
    { "Three": 'coral' },
    { "Four": 'skyblue' },
  ]
  return items.map((item) => {
    const key = Object.keys(item)[0];
    return (
      <Text style={[
        styles[item[key]],
        styles.box
      ]}>{key}</Text>
    )
  })
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20
  },
  container: {
    paddingTop: 40,
    backgroundColor: '#777',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerFlex: {
    paddingTop: 40,
    backgroundColor: '#ddd',
    flex: 1,
    flexDirection: 'row'
  },
  box: {
    padding: 10,
  },
  violet: { backgroundColor: 'violet' },
  gold: { backgroundColor: 'gold' },
  coral: { backgroundColor: 'coral' },
  skyblue: { backgroundColor: 'skyblue' }
})

export default FlexBox;