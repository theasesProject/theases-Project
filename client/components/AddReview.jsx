import { AirbnbRating } from "react-native-ratings";
import carImg from "../assets/Honda.jpg";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

const { width, height } = Dimensions.get("screen");
const AddReview = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [ratingDescription, setRatingDescription] = useState("");
  const [comment, setComment] = useState("");

  const ratingCompleted = (rate) => {
    if (rate > 0) {
      setRated(true);
    } else {
      setRated(false);
    }
    if (rate === 1) {
      setRatingDescription("Terrible");
    } else if (rate === 2) {
      setRatingDescription("Bad");
    } else if (rate === 3) {
      setRatingDescription("Okay");
    } else if (rate === 4) {
      setRatingDescription("Good");
    } else if (rate === 5) {
      setRatingDescription("Great");
    }
    setRating(rate);
  };

  const handleSubmit = () => {
    console.log({
      rating: rating,
      ratingDescription: ratingDescription,
      comment: comment,
    });
  };

  return (
    <View style={styles.reviewPage}>
      <View style={styles.topSection}>
        <Image source={carImg} style={styles.carImg} />
        <View style={styles.carInfo}>
          <Text style={styles.carName}>car name</Text>
          <Text style={styles.agencyName}>agency name</Text>
        </View>
      </View>
      <AirbnbRating
        count={5}
        defaultRating={0}
        onFinishRating={ratingCompleted}
        size={30}
        starContainerStyle={styles.starsContainer}
      />
      <View style={styles.bottomSection}>
        <TextInput
          onChangeText={(content) => setComment(content)}
          style={styles.textArea}
          textAlignVertical="top"
          multiline={true}
          placeholder="Add your comment..."
        />
        <TouchableOpacity
          style={styles.submitBtnContainer}
          activeOpacity={0.8}
          onPress={handleSubmit}
          disabled={!rated}
        >
          <LinearGradient
            colors={rated ? ["#6C77BF", "#4485C5"] : ["#88b4e2", "#88b4e2"]}
            locations={[0, 1]}
            style={styles.submitBtn}
          >
            <Text style={styles.submitBtnContent}>submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewPage: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    gap: height * 0.02,
  },
  topSection: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: height * 0.15,
  },
  carImg: {
    width: width * 0.55,
    height: height * 0.15,
    borderColor: "#6C77BF",
    borderWidth: 2,
    borderRadius: 7,
  },
  carInfo: {
    height: "100%",
    justifyContent: "space-around",
  },
  carName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
  },
  agencyName: {
    fontSize: 14,
    color: "rgb(130, 124, 140)",
    textAlign: "right",
  },
  starsContainer: {
    gap: width * 0.07,
  },
  bottomSection: {
    gap: height * 0.04,
  },
  submitBtnContainer: {
    width: "100%",
  },
  textArea: {
    height: height * 0.2,
    backgroundColor: "white",
    textAlign: "left",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    borderRadius: 10,
    borderColor: "#6C77BF",
    borderWidth: 1,
  },
  submitBtn: {
    borderRadius: 10,
    height: 50,
    width: "100%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnContent: {
    color: "white",
    fontSize: 18,
  },
});

export default AddReview;

// import { View, Text } from "react-native";

// const AddReview = () => {
//   const [rating, setRating] = useState(0);
//   const [star1, setStar1] = useState(false);
//   const [star2, setStar2] = useState(false);
//   const [star3, setStar3] = useState(false);
//   const [star4, setStar4] = useState(false);
//   const [star5, setStar5] = useState(false);
//   const [review, setReview] = useState("");

//   const handleRating = () => {

//   };

//   return (
//     <View>
//       <Text>AddReview</Text>
//     </View>
//   );
// };

// export default AddReview;
