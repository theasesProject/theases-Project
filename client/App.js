import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import Home from './pages/Home.jsx';
const Stack = createStackNavigator();
import { createStackNavigator } from '@react-navigation/stack';
 function App() {

  return (
    <NavigationContainer>
       <Stack.Navigator    initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
     
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