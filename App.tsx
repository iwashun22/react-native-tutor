import { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store, persistore } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import Home from './src/screen/Home';
import MyCounter from './src/screen/MyCounter';
import CustomNavbar from './src/screen/CustomNavbar';
import MyFlatList from './src/screen/MyFlatList';
import MyTodoList from './src/screen/MyTodoList';

import { pageList as p } from './src/pageNames';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "cancel",
          onPress: () => null,
          style: "cancel"
        },
        {
          text: "yes",
          onPress: () => { BackHandler.exitApp() }
        }
      ])
      return true;
    }
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [])
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={p.home}>
          <Stack.Screen name={p.home} component={Home}/>
          <Stack.Screen name={p.counter} component={MyCounter}/>
          <Stack.Screen name={p.navbar} component={CustomNavbar}/>
          <Stack.Screen name={p.flatlist} component={MyFlatList}/>
          <Stack.Screen name={p.todolist} component={MyTodoList}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
    </Provider>
  );
}
