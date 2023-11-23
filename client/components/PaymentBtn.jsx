import axios from "axios";
import {
  Text,
  Linking,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { LinearGradient } from "expo-linear-gradient";
const { height, width } = Dimensions.get("window");

const PaymentBtn = ({amount}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const activeUser = useSelector(selectUser);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "FiraMono-Bold": FiraMonoBold,
        "FiraMono-Medium": FiraMonoMedium,
      });
    };

    loadFonts();
  }, []);
  const handleStripe = async () => {
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/payment/intentsStripe`,
        // this amount will be sent by props when we use this btn component
        { amount: amount*100 }
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

  return (
    <TouchableOpacity
      style={styles.payBtnContainer}
      activeOpacity={0.8}
      onPress={handleStripe}
    >
      <LinearGradient
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
    width: width * 0.3,
  },
  payBtn: {
    borderRadius: 10,
    height: height * 0.055,
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
