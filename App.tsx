import { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native/';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Home from './src/screen/Home';
import MyCounter from './src/screen/MyCounter';

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} navigationKey="Todo"/>
        <Stack.Screen name="Counter" component={MyCounter}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
