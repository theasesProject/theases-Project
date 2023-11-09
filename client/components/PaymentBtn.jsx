import axios from "axios";
import { Text, Linking, StyleSheet, TouchableOpacity } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { LinearGradient } from "expo-linear-gradient";

const Payment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const activeUser = useSelector(selectUser);

  const handleStripe = async () => {
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/payment/intentsStripe`,
        { amount: 12345 }
      );
      await initPaymentSheet({
        merchantDisplayName: "Rent & Go",
        paymentIntentClientSecret: response.data.paymentIntent,
        defaultBillingDetails: {
          name: activeUser?.userName,
        },
      });
      await presentPaymentSheet();
    } catch (err) {
      console.error(err);
    }
  };

  //   const handleFlouci = async () => {
  //     try {
  //       const response = await axios.post(
  //         `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/payment/intentsFlouci`,
  //         { amount: 12345 }
  //       );
  //       Linking.openURL(response.data.result.link);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  return (
    <TouchableOpacity
      style={styles.payBtnContainer}
      activeOpacity={0.8}
      onPress={handleStripe}
      // disabled={!formChecked}
    >
      <LinearGradient
        //   colors={formChecked ? ["#6C77BF", "#4485C5"] : ["#88b4e2", "#88b4e2"]}
        colors={["#6C77BF", "#4485C5"]}
        locations={[0, 1]}
        style={styles.payBtn}
      >
        <Text style={styles.payBtnContent}>Pay</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  payBtnContainer: {
    width: "100%",
  },
  payBtn: {
    borderRadius: 10,
    height: 50,
    width: "100%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  payBtnContent: {
    color: "white",
    fontSize: 18,
  },
});

export default Payment;