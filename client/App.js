import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import Home from './pages/Home.jsx';

//! DO NOT TOUCH THIS IMPORT OR CHANGE ANYTHING ABOUT IT

"DO NOT TOUCH THIS IMPORT OR CHANGE ANYTHING ABOUT IT"

import SignUp from "./pages/signUp.jsx";

"DO NOT TOUCH THIS IMPORT OR CHANGE ANYTHING ABOUT IT"

//! DO NOT TOUCH THIS IMPORT OR CHANGE ANYTHING ABOUT IT

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App