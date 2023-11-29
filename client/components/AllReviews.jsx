import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import ReviewCard from "../components/ReviewCard";
import { useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';
const {height , width} = Dimensions.get("screen")

function AllReviews() {
  const [allReviews, setAllReviews] = useState([]);
  const [someReviews, setSomeReviews] = useState([]);
  const [reviewsView, setReviewsView] = useState("view more");
  const activeUser = useSelector(selectUser)


  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/review/getAllByAgencyId/${activeUser.id}`
      );
      console.log("reviews: ", response.data);
      setAllReviews(response.data);
      setSomeReviews(response.data.slice(0, 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewsView = (newView) => setReviewsView(newView);

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <ScrollView>
        <View style={styles.agencyReviews}>
          
          {(reviewsView === "view more" ? someReviews : allReviews).map(
            (review, index) => (
              <ReviewCard review={review} key={index} />
            )
          )}
        </View>
        {allReviews.length > 0 ? (
          <Pressable
            onPress={() => {
              reviewsView === "view more"
                ? handleReviewsView("view less")
                : handleReviewsView("view more");
            }}
          >
            <View style={styles.reviewsViewContainer}>
              <Text style={styles.reviewsView}>{reviewsView}</Text>
            </View>
          </Pressable>
        ) : (
          <View style={styles.reviewsViewContainer}>
            <Text style={styles.noReviews}>no reviews yet</Text>
          </View>
        )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  reviewsViewContainer: {
    width: width,
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  agencyReviews: {},
});

export default AllReviews