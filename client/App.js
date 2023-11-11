import { StyleSheet, View, Text, Button, Platform } from "react-native";
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
// import Remobg from "./pages/removeBackground.jsx";
("DO NOT TOUCH THIS IMPORT OR CHANGE ANYTHING ABOUT IT");

import Booking from "./pages/Booking.jsx";
import AgencyService from "./pages/AgencyService.jsx";
import MyCars from "./pages/MyCars.jsx";
import AgencyProfile from "./pages/AgencyProfile.jsx";
import MapAgencyProfile from "./pages/MapAgencyProfile.jsx";
import { StripeProvider } from "@stripe/stripe-react-native";
const Stack = createStackNavigator();
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";

// import React, { useState, useRef, useEffect } from "react";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

function App() {
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "space-around",
    //   }}
    // >
    //   <Text>Your expo push token: {expoPushToken}</Text>
    //   <View style={{ alignItems: "center", justifyContent: "center" }}>
    //     <Text>
    //       Title: {notification && notification.request.content.title}{" "}
    //     </Text>
    //     <Text>Body: {notification && notification.request.content.body}</Text>
    //     <Text>
    //       Data:{" "}
    //       {notification && JSON.stringify(notification.request.content.data)}
    //     </Text>
    //   </View>
    //   <Button
    //     title="Press to schedule a notification"
    //     onPress={async () => {
    //       await schedulePushNotification();
    //     }}
    //   />
    // </View>

    <Provider store={store}>
      <StripeProvider publishableKey={process.env.EXPO_STRIPE_PUBLISHBLE_KEY}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AgencyService"
              component={AgencyService}
              options={{ headerShown: true }}
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
              name="favorites"
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
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "hello aymen",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
export default App;
