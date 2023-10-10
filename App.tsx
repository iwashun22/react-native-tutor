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
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Counter" component={MyCounter}/>
          <Stack.Screen name="Navbar" component={CustomNavbar}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
    </Provider>
  );
}
