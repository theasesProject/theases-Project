import * as React from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import frim from "../assets/Fst-removebg-preview.png";
import scim from "../assets/secondpage-removebg-preview.png";
import thim from "../assets/ddd.png";

function Carou() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const navigation = useNavigation();

  const data = [
    {
      id: "1",
      text: "Download App",
      secondText:
        "Welcome to [Your App Name] We're thrilled you've chosen us. Stay tuned for updates and enjoy your journey with us",
      image: frim,
    },
    {
      id: "2",
      text: "Select a Car",
      secondText:
        "At [Your Business Name], you can rent a car and start your journey effortlessly",
      image: scim,
    },
    {
      id: "3",
      text: "Enjoy your Ride",
      secondText:
        "At [Your Business Name], you can rent a car and start your journey effortlessly",
      image: thim,
    },
  ];
  const carouselRef = React.useRef(null);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const handleNextButton = () => {
    if (activeSlide < 2) {
      const nextSlide = activeSlide + 1;
      setActiveSlide(nextSlide);
      if (carouselRef.current) {
        carouselRef.current.next(nextSlide);
      }

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        fadeAnim.setValue(1);
      });
    } else if (activeSlide === 2) {
      navigation.navigate("Login");
    }
  };

  const renderItem = ({ item, index }) => {
    const animatedStyle = {
      opacity: fadeAnim,
    };

    return (
      <Animated.View style={[styles.slide, animatedStyle]}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.stext}>{item.secondText}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={carouselRef}
        loop
        width={width}
        height={height - 50}
        autoPlay={false}
        data={data}
        scrollAnimationDuration={500}
        onSnapToItem={(index) => setActiveSlide(index)}
        renderItem={renderItem}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.skiptext}>
            {activeSlide === 2 ? null : "Skip"}
          </Text>
        </TouchableOpacity>

        <View style={styles.indicatorContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                activeSlide === index ? styles.activeIndicator : null,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleNextButton}>
          <Text style={styles.next}>
            {activeSlide === 2 ? "Login" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  stext: {
    fontSize: 16,
    width: 250,
  },
  skiptext: {
    fontSize: 18,
    textAlign: "left",
    color: "blue",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  footerLeft: {
    flex: 1,
  },
  indicatorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    width: 25,
    height: 5,
    borderRadius: 5,
    backgroundColor: "gray",
    margin: 5,
  },
  activeIndicator: {
    backgroundColor: "blue",
  },
  next: {
    textAlign: "right",
    fontSize: 18,
  },
});

export default Carou;
