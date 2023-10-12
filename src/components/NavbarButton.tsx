import React, { ReactElement } from 'react'
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from './Icon';

function NavbarButton({toggleSideBar}: {toggleSideBar: () => any}): ReactElement {
  return (
    <View>
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity 
          style={{ alignItems: "flex-end", margin: 16 }}
          onPress={toggleSideBar}
        >
          <Icon iconName="bars" size={24} color="#161924"/>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

export {
  NavbarButton
}