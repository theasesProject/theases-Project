import { View, Text, Button, StyleSheet, Image, TextInput } from "react-native";
import Logo from "../assets/tempLogo.png";
import Google from "../assets/googleIcon.png";
import Facebook from "../assets/facebookIcon.png";
import { LinearGradient } from "expo-linear-gradient";

function Login({ navigation }) {
  return (
    <View style={styles.loginPage}>
      <View style={styles.headers}>
        <View style={styles.logoContainer}>
          <Image source={Logo} alt="logo" />
        </View>
        <Text style={styles.welcome}>Welcome Back</Text>
        <Text style={styles.paragraph}>
          Log in to your account using email or phone number
        </Text>
      </View>
      <View style={styles.loginForm}>
        <TextInput
          placeholder="email or phone number"
          style={styles.identifierInput}
        />
        <TextInput
          placeholder="password"
          style={styles.passwordInput}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>
      <View style={styles.loginBtnContainer}>
        <LinearGradient
          // colors={["rgba(80,129,195,1)", "rgba(56,135,200,1)"]}
          // start={{ x: 0, y: 0.5 }}
          // end={{ x: 1, y: 0.5 }}
          colors={["#6C77BF", "#4485C5"]}
          locations={[0, 1]}
          style={styles.loginBtn}
        >
          <Text style={styles.loginBtnContent}>Log In</Text>
        </LinearGradient>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.createAcc}>
          <Text>First time here?</Text>
          <Text>Sign up</Text>
        </View>
        <View style={styles.loginWith}>
          <View style={styles.line}></View>
          <Text>Or sign in with</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.quickLoginContainer}>
          <View style={styles.quickLogin}>
            <View style={styles.icons}>
              <Image source={Google} alt="google" style={styles.icons} />
            </View>
            <Text>Google</Text>
          </View>
          <View style={styles.quickLogin}>
            <View style={styles.icons}>
              <Image source={Facebook} alt="facebook" style={styles.icons} />
            </View>
            <Text>Facebook</Text>
          </View>
        </View>
      </View>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Home")}
      /> */}
    </View>
  );
}

Login.navigationOptions = {
  title: "Login",
};

const styles = StyleSheet.create({
  loginPage: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flex: 1,
    gap: 30,
  },
  headers: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    color: "rgba(1,1,1,0.5)",
    textAlign: "center",
    width: 220,
  },
  loginForm: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  identifierInput: {
    backgroundColor: "#eef1f8",
    borderRadius: 5,
    height: 50,
    padding: 10,
  },
  passwordInput: {
    backgroundColor: "#eef1f8",
    borderRadius: 5,
    height: 50,
    padding: 10,
  },
  forgotPasswordContainer: {
    width: "100%",
  },
  forgotPassword: {
    textAlign: "right",
  },
  loginBtnContainer: {
    width: "100%",
  },
  loginBtn: {
    borderRadius: 10,
    height: 50,
    width: "100%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtnContent: {
    color: "white",
    fontSize: 18,
  },
  bottomSection: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  createAcc: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  loginWith: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    height: 1,
    width: 110,
    backgroundColor: "#e5e6e8",
  },
  quickLoginContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  quickLogin: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    border: "solid",
    borderColor: "#e5e6e8",
    borderWidth: 1,
    borderRadius: 10,
    width: 150,
    height: 50,
    gap: 15,
  },
  icons: {
    width: 20,
    height: 20,
  },
});
export default Login;
