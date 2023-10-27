import { View, Text, Button } from "react-native";
import * as ReactNative from "react-native";

function Home({ navigation }) {
  return (
    <ReactNative.View>
      <ReactNative.Button
        title="Go to Sign Up page"
        onPress={() => navigation.navigate("SignUp")}
      ></ReactNative.Button>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Userprofile")}
      />
      <ReactNative.Button
        title="Login page"
        onPress={() => navigation.navigate("Login")}
      ></ReactNative.Button>
    </ReactNative.View>
  );
}

Home.navigationOptions = {
  title: "Home",
};
export default Home;
