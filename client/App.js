import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import LoadingScreen from "./pages/Loading.jsx"
import Userprofile from "./pages/UserProfile.jsx";
//! DO NOT TOUCH THIS IMPORT OR CHANGE ANYTHING ABOUT IT
import SignUp from "./pages/signUp.jsx";

("DO NOT TOUCH THIS IMPORT OR CHANGE ANYTHING ABOUT IT");




const Stack = createStackNavigator();
function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Userprofile"
          component={Userprofile}
          options={{ headerShown: false }}
        />
   
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>

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
