import axios from "axios";
import { Button, View } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";

const Payment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const activeUser = useSelector(selectUser);

  const handleStripe = async () => {
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/payment/intents`,
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

  const handleFlouci = async () => {
    try {
      console.log("payed");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Button title="Pay with stripe" onPress={handleStripe} />
      <Button title="Pay with flouci" onPress={handleFlouci} />
    </View>
  );
};

export default Payment;
