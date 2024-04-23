import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterSelection, setSelected } from "../store/carFetch";
const { width, height } = Dimensions.get("screen");

const ToggleDownPaymentBtn = ({ text }) => {
  // const [isPressed, setIsPressed] = useState(initState);
  const selected = useSelector(filterSelection).downPayment;
  const dispatch = useDispatch();

  const handlePress = () => {
    // console.log("text: ", text);
    // console.log("state: ", selected);
    if (selected === text && text !== "All") {
      return dispatch(setSelected({ key: "downPayment", value: "All" }));
    }
    dispatch(setSelected({ key: "downPayment", value: text }));
  };

  useEffect(() => {
    dispatch(setSelected({ key: "downPayment", value: "All" }));
  }, []);

  return (
    <TouchableOpacity onPress={handlePress}>
      <LinearGradient
        colors={
          text === selected ? ["#6C77BF", "#4485C5"] : ["#E9E9E9", "#E9E9E9"]
        }
        locations={[0, 1]}
        style={styles.button}
      >
        <Text
          style={{
            ...styles.textContent,
            color: text === selected ? "white" : "black",
          }}
        >
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: width * 0.277,
  },
  textContent: {
    fontSize: 14,
  },
});

export default ToggleDownPaymentBtn;
