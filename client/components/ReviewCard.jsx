import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import img from "../assets/car2.png";
import moment from "moment";
const { width, height } = Dimensions.get("screen");

const ReviewCard = ({ review }) => {
  const car = review.Car;
  console.log("car: ", car);
  return (
    <View style={styles.reviewCard}>
      <View style={styles.topSection}>
        <View style={styles.reviewInfo}>
          <Text style={styles.userName}>User Name</Text>
          <Text style={styles.reviewCreatedAt}>
            {moment(review.createdAt).format("MMMM Do YYYY")}
          </Text>
        </View>
        <View style={styles.carDetailsContainer}>
          <View style={styles.carImgContainer}>
            <Image style={styles.carImg} source={img} />
          </View>
          <Text style={styles.carName}>Car Name</Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.ratingSection}>
          <AirbnbRating
            count={5}
            defaultRating={review.rating}
            size={20}
            isDisabled={true}
            starContainerStyle={styles.starsContainer}
            reviewSize={20}
          />
        </View>
        <View style={styles.reviewSection}>
          <Text style={styles.review}>{review.comment}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: "white",
    marginBottom: height * 0.02,
    borderRadius: 10,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "yellow",
    height: height * 0.1,
  },
  reviewInfo: {
    // backgroundColor: "red",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
    alignItems: "flex-start",
  },
  carDetailsContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
  userName: {
    fontSize: 16,
  },
  carImgContainer: {
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: width * 0.01,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#6a78c1",
  },
  reviewCreatedAt: {},
  carImg: {
    width: width * 0.3,
    height: height * 0.07,
  },
  carName: {},
  bottomSection: {},
  ratingSection: {},
  starsContainer: {
    gap: width * 0.01,
  },
  reviewSection: {},
  review: {
    fontSize: 18,
  },
});

export default ReviewCard;
