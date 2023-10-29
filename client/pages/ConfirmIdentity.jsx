import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Logo from "../assets/tempLogo.png";

import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";

function ConfirmIdentity({ navigation }) {
  return (
    <View style={styles.confirmIdentityPage}>
      <Text>
        this page will have an input to insert a code that the use will get via
        email or phone number so we can confirm his identity and redirect him to
        a page where he can reset his password
      </Text>
    </View>
  );
}

ConfirmIdentity.navigationOptions = {
  title: "ConfirmIdentity",
};

const styles = StyleSheet.create({
  confirmIdentityPage: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flex: 1,
    gap: 30,
  },
});
export default ConfirmIdentity;
