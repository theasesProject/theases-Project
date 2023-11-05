import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import CarDetails from "./pages/carDetails.jsx";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Carou from "./pages/Carou.jsx";
import store from "./store/store";
import { Provider } from "react-redux";
import UserProfile from "./pages/UserProfile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ConfirmIdentity from "./pages/ConfirmIdentity.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Favorites from "./pages/Favorites.jsx";
import AddAgencyCar from "./pages/AddAgencyCar.jsx";
import AdvancedSearch from "./pages/AdvancedSearch.jsx";
import FiltredCar from "./pages/FiltredCar.jsx";
//! DO NOT TOUCH THIS IMPORT OR CHANGE ANYTHING ABOUT IT
import SignUp from "./pages/signUp.jsx";
import ChangeRole from "./pages/changeRole.jsx";
import Mape from "./pages/Mape.jsx";
import MapComponent from "./pages/MapForAdminLoc.jsx";
import Bookings from "./pages/Bookings.jsx";
// import Remobg from "./pages/removeBackground.jsx";
("DO NOT TOUCH THIS IMPORT OR CHANGE ANYTHING ABOUT IT");

const Stack = createStackNavigator();
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>

        <Stack.Navigator initialRouteName="home">

          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="favorites"
            component={Favorites}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="mapforAgency"
            component={MapComponent}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="details"
            component={CarDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Bookings"
            component={Bookings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="changeRole"
            component={ChangeRole}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Mape"
            component={Mape}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{ headerShown: false }}
          /> */}

          {/* <Stack.Screen
            name="Carousel"
            component={Carousel}
          /> */}
          <Stack.Screen
            name="Carou"
            component={Carou}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Userprofile"
            component={UserProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="forgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="Remobg"
            component={Remobg}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="confirmIdentity"
            component={ConfirmIdentity}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="editProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdvancedSearch"
            component={AdvancedSearch}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FiltredCar"
            component={FiltredCar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CarDetails"
            component={CarDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddAgencyCar"
            component={AddAgencyCar}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
