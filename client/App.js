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
import EditProfile from "./pages/EditProfile.jsx";
import Favorites from "./pages/Favorites.jsx";
import AddAgencyCar from "./pages/AddAgencyCar.jsx";
import Messages from "./pages/Messages.jsx";
import AdvancedSearch from "./pages/AdvancedSearch.jsx";
import FiltredCar from "./pages/FiltredCar.jsx";
import SignUp from "./pages/signUp.jsx";
import ChangeRole from "./pages/changeRole.jsx";
import Mape from "./pages/Mape.jsx";
import Conversation from "./pages/Conversation.jsx";
import MapComponent from "./pages/MapForAdminLoc.jsx";
import Bookings from "./pages/Bookings.jsx";
import Report from "./pages/Report.jsx";
import Booking from "./pages/Booking.jsx";
import AgencyService from "./pages/AgencyService.jsx";
import MyCars from "./pages/MyCars.jsx";
import AgencyProfile from "./pages/AgencyProfile.jsx";
import MapAgencyProfile from "./pages/MapAgencyProfile.jsx";
import { StripeProvider } from "@stripe/stripe-react-native";
import ResetPassword from "./pages/ResetPassword.jsx";
import MapForUser from "./pages/MapForUser.jsx";
import AgencyProfileUser from "./pages/AgencyProfileUser.jsx";
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={process.env.EXPO_STRIPE_PUBLISHBLE_KEY}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            {/* {(props) => <Home {...props} style={globalStyles.global} />} */}
            <Stack.Screen
              name="MapForUser"
              component={MapForUser}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="AgencyService"
              component={AgencyService}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Report"
              component={Report}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Booking"
              component={Booking}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="MyCars"
              component={MyCars}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Favorites"
              component={Favorites}
              options={{ headerShown: true }}
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
              name="Messages"
              component={Messages}
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
            <Stack.Screen
              name="conversation"
              component={Conversation}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{ headerShown: false }}
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
            <Stack.Screen
              name="editProfile"
              component={EditProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AdvancedSearch"
              component={AdvancedSearch}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="FiltredCar"
              component={FiltredCar}
              options={{ headerShown: true }}
            />

            <Stack.Screen
              name="AddAgencyCar"
              component={AddAgencyCar}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="AgencyProfile"
              component={AgencyProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AgencyProfileUser"
              component={AgencyProfileUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MapAgencyProfile"
              component={MapAgencyProfile}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}

export default App;
