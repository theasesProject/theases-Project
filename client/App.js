import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/Home.jsx";

// import { Provider } from 'react-redux';
// import {store} from "./redux/store.jsx"
//! DO NOT TOUCH THIS IMPORT OR CHANGE ANYTHING ABOUT IT


const Stack = createStackNavigator();
function App() {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen  options={{ headerShown: false }} name="Home" component={Home} />

      
       
       
      
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
