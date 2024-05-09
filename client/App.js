import { createStackNavigator } from "@react-navigation/stack";
import CarDetails from "./pages/carDetails.jsx";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Carou from "./pages/Carou.jsx";
import store from "./store/store";
import { lazy, Suspense, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import UserProfile from "./pages/UserProfile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Favorites from "./pages/Favorites.jsx";
import AddAgencyCar from "./pages/AddAgencyCar.jsx";
const LazyComponent = lazy(() => import("./pages/Messages.jsx"));
import AdvancedSearch from "./pages/AdvancedSearch.jsx";
import FiltredCar from "./pages/filtredCar.jsx";
import SignUp from "./pages/signUp.jsx";
import ChangeRole from "./pages/changeRole.jsx";
import Mape from "./pages/Mape.jsx";
import Conversation from "./pages/Conversation.jsx";
import MapComponent from "./pages/MapForAdminLoc.jsx";
import Bookings from "./pages/Bookings.jsx";
import Report from "./pages/Report.jsx";
("DO NOT TOUCH THIS IMPORT OR CHANGE ANYTHING ABOUT IT");
import Notification from "./pages/Notifcation.jsx";
import Booking from "./pages/Booking.jsx";
import AgencyService from "./pages/AgencyService.jsx";
import MyCars from "./pages/MyCars.jsx";
import AgencyProfile from "./pages/AgencyProfile.jsx";
import MapAgencyProfile from "./pages/MapAgencyProfile.jsx";
import { StripeProvider } from "@stripe/stripe-react-native";
import ResetPassword from "./pages/ResetPassword.jsx";
import MapForUser from "./pages/MapForUser.jsx";
import AgencyProfileUser from "./pages/AgencyProfileUser.jsx";
import AddAgencyCar2 from "./pages/AddAgencyCar2.jsx";
import AddCarAgency3 from "./pages/AddCarAgency3.jsx";
import AllBookings from "./pages/AllBookings.jsx";
import AddReview from "./pages/AddReview.jsx";
import TransportationMap from "./pages/TransportationMap.jsx";
import EditAgencyProfile from "./pages/EditAgencyProfile.jsx";
import Userprofile1 from "./pages/UserProfile1.jsx";
import Welcome from "./pages/Welcome.jsx";
import SignUpAgency from "./pages/SignUpAgency.jsx";
import NewHome from "./pages/NewHome.jsx";
import CarsList from "./pages/CarsList.jsx";
import NewCarDetails from "./pages/NewCarDetails.jsx";
import NewSignUp from "./pages/NewSignUp.jsx";
import NewLogIn from "./pages/NewLogIn.jsx";
import NewProfile from "./pages/NewProfile.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import ReviewAndBook from "./pages/ReviewAndBook.jsx";
import BookingHistory from "./pages/BookingHistory.jsx";
import MyInformation from "./pages/MyInformation.jsx";
import FAQS from "./pages/FAQS.jsx";
import SignUpNew from "./pages/SignUpNew.jsx";
// import NewSignUp from "./pages/NewSignUp.jsx";
import OtpVerificationEmail from "./pages/OtpVerificationEmail.jsx";
import Emailaccount from "./pages/Emailaccount.jsx";
import OtpForgotEmail from "./pages/OtpForgotEmail.jsx"
import ChangePassword from "./pages/ChangePassword.jsx";
const Stack = createStackNavigator();
import Toast from 'react-native-toast-message';


function App() {
  // const toastConfig = {
  //   success: (props) => (
  //     <Toast
  //       {...props}
  //       style={{ backgroundColor: 'green' }}
  //       // contentContainerStyle={{ paddingHorizontal: 15 }}
  //       // text1Style={{ fontSize: 15, fontWeight: '400' }}
  //     />
  //   ),
  //   // Add more custom toast types here
  // };
  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHBLE_KEY}
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="CarsList"
              component={CarsList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyInformation"
              component={MyInformation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ReviewAndBook"
              component={ReviewAndBook}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FAQS"
              component={FAQS}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewCarDetails"
              component={NewCarDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditions}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewProfile"
              component={NewProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BookingHistory"
              component={BookingHistory}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="newSignUp"
              component={NewSignUp}
              options={{
                headerShown: false,
                headerStatusBarHeight: 0,
              }}
            />
            <Stack.Screen
              name="newLogIn"
              component={NewLogIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewHome"
              component={NewHome}
              options={{ headerShown: false }}
            />
            {/* {(props) => <Home {...props} style={globalStyles.global} />} */}
            <Stack.Screen
              name="AddReview"
              component={AddReview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UsersProfile"
              component={Userprofile1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AllBookings"
              component={AllBookings}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="TransportationMap"
              component={TransportationMap}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="MapForUser"
              component={MapForUser}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Notification"
              component={Notification}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AgencyService"
              component={AgencyService}
              options={{ headerShown: false }}
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
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Favorites"
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
              name="Messages"
              component={LazyComponent}
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
              name="SignUpAgency"
              component={SignUpAgency}
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
              name="EditAgencyProfile"
              component={EditAgencyProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={AdvancedSearch}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FiltredCar"
              component={FiltredCar}
              options={{ headerShown: false }}
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
            <Stack.Screen
              name="AddCarAgency2"
              component={AddAgencyCar2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddCarAgency3"
              component={AddCarAgency3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpNew"
              component={SignUpNew}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OtpVerification"
              component={OtpVerificationEmail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EmailAccount"
              component={Emailaccount}
              options={{ headerShown: false }}
            />
           
            <Stack.Screen
              name="OtpForgotEmail"
              component={OtpForgotEmail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <Toast  />
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}

export default App;
