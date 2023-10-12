import React, { useState } from 'react';
import { SafeAreaView, Button, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

type ItemListType = Array<{name: string, key: string}>

const itemList: ItemListType = [
  { name: 'Basketball', key: '1' },
  { name: 'Apple', key: '2' },
  { name: 'Lighter', key: '3' },
  { name: 'Icecream', key: '4' },
  { name: 'Iphone', key: '5' }
] as const;

export default function MyFlatList() {
  const [items, setItems] = useState<ItemListType>(itemList);
  const [deleted, setDeleted] = useState<boolean>(false);
  return (
    <SafeAreaView>
      <FlatList
        numColumns={2}
        data={items}
        keyExtractor={(item) => item.key}
        style={{display: 'flex'}}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        ListEmptyComponent={() => 
          <Text 
            style={{
              fontSize: 16, 
              textAlign: 'center',
              margin: 30
            }}
          >The list is empty</Text>
        }
        renderItem={({item}) => (
          <View style={style.itemBox} key={item.key}>
            <TouchableOpacity 
              onPress={e => {
                setItems(items => items.filter(i => i.key !== item.key))
                if(!deleted) setDeleted(true)
              }}
            >
              <Text 
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  fontFamily: ''
                }}
              >{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      { deleted &&
        <Button 
          title="recover" 
          onPress={() => {
            setItems(itemList);
            setDeleted(false);
          }}
        /> 
      }
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  itemBox: {
    flex: 1/2,
    backgroundColor: 'yellow',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'orange'
  }
})