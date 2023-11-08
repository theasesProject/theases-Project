import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import SwipeUpDown from "react-native-swipe-up-down";
import LinearGradient from "expo-linear-gradient";
import axios from "axios";
import CardCar from "../components/CardCar.jsx";
import BrandBar from "../components/brandBar.jsx";
import { filterCars, getAllCars } from "../store/carFetch";
import ProfileLandingPage from "../components/NavBarLandingPage.jsx";
import SearchBar from "../components/searchBar.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar.jsx";
import { Animated } from "react-native";
const { height, width } = Dimensions.get("screen");
import CarDetails from "./carDetails.jsx";
import ItemMini from "../components/ItemMini.jsx";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

function Home({ navigation }) {
  const dispatch = useDispatch();
  const [isVisibleSwipe, setIsVisibleSwipe] = useState(false);
  const allCars = useSelector((state) => state.car.allCars);
  const fixedData = useSelector((state) => state.car.fixedData);
  const loading = useSelector((state) => state.car.loading);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [nothing, setNothing] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  console.log("CAR TABLE!!!!!!!!!!!!!!!!", allCars);
  const swipeUpDownRef = useRef();
  const handlePress = () => {
    if (swipeUpDownRef.current) {
      swipeUpDownRef.current.showFull();
      // setIsVisibleSwipe(true)
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllCars()).then(() => setRefreshing(false));
  }, [dispatch]);

  const updateFilteredCars = (filteredCarData) => {
    dispatch(filterCars(filteredCarData));
  };

  const resetData = () => {
    dispatch(filterCars(fixedData));
  };

  const retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem("UserToken");
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      console.error("error coming from home", e);
    }
  };

  useEffect(() => {
    dispatch(getAllCars());
    // dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: scrollPosition,
        animated: true,
      });
    }
  }, [loading]);

  return (
    <View style={styles.homePage}>
      <ScrollView
        ref={scrollViewRef}
        // onScroll={(event) => {
        //   setScrollPosition(event.nativeEvent.contentOffset.y);
        // }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfileLandingPage style={styles.header} />
        <SearchBar onSearch={updateFilteredCars} />
        <BrandBar onFilterByBrand={updateFilteredCars} resetData={resetData} />
        {!loading ? (
          allCars?.map((element, i) => (
            <View style={styles.allcars} key={i}>
              <CardCar
                setNothing={setNothing}
                key={i}
                oneCar={element}
                handlePress={handlePress}
              />
            </View>
          ))
        ) : (
          <>
            <View style={{ alignItems: "center", paddingTop: 20 }}>
              <View
                style={{
                  width: width * 0.9,
                  borderRadius: 10,
                  overflow: "hidden",
                  backgroundColor: "white",
                  padding: 10,
                }}
              >
                <ShimmerPlaceholder
                  style={{
                    width: "100%",
                    height: width * 0.374,
                    borderRadius: 10,
                  }}
                  shimmerColors={["#f3f3f3", "white", "#f3f3f3"]}
                />
                <ShimmerPlaceholder
                  style={{
                    width: "100%",
                    height: width * 0.15,
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                  shimmerColors={["#f3f3f3", "white", "#f3f3f3"]}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", paddingTop: 20 }}>
              <View
                style={{
                  width: width * 0.9,
                  borderRadius: 10,
                  overflow: "hidden",
                  backgroundColor: "white",
                  padding: 10,
                }}
              >
                <ShimmerPlaceholder
                  style={{
                    width: "100%",
                    height: width * 0.374,
                    borderRadius: 10,
                  }}
                  shimmerColors={["#f3f3f3", "#e6e6e6", "#f3f3f3"]}
                />
                <ShimmerPlaceholder
                  style={{
                    width: "100%",
                    height: width * 0.15,
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                  shimmerColors={["#f3f3f3", "#e6e6e6", "#f3f3f3"]}
                />
              </View>
            </View>
          </>
        )}
        {/* <CarDetails /> */}
      </ScrollView>

      {/* <View style={{ height: 500 , 
            backgroundColor: "green",
            display: isVisible ? "flex" : "none",
          }}> */}
{/* <View style={{ height: '1%' }}> */}

      <SwipeUpDown
        itemFull={<CarDetails />}
        ref={swipeUpDownRef}
        extraMarginTop={"60%"}
        scrollEnabled={false}
        style={{
          height: "100%",
          backgroundColor: "lightgrey",
          //  backgroundColor: 'transparent'
        }}
      />
{/* </View> */}
      {/* // display: isVisible ? "flex" : "none",
        // itemMini={(show) => <CarDetails show={show} style={{ height: 60 }} />}
        // onShowMini={() => setIsVisibleSwipe(false)}
        // onShowFull={() => {
        //   console.log("full");
        //   setIsVisible(true); // Show the SwipeUpDown component when itemFull is shown
        // }}
        // onMoveDown={() =>setIsVisibleSwipe(false)}
        // swipeHeight={height*.6} // Default 60
        // onMoveUp={() => console.log("up")}
        // disablePressToShow={false} // Press item mini to show full
        // Hide the SwipeUpDown component when isVisible is false */}
      {/* </View> */}

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    paddingTop: 20,
  },
  SearchBar: {},
  NavBar: {
    height: height * 0.05,
  },
  homePage: {
    flex: 1,
    backgroundColor: "rgb(233, 231, 238)",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  searchContainer: {},
  allcars: {
    padding: 20,
    paddingBottom: 20,
  },
});

export default Home;

// import React, { useEffect, useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Button,
//   TouchableOpacity,
//   Dimensions,
//   RefreshControl,
// } from "react-native";
// import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
// import LinearGradient from "expo-linear-gradient";
// import axios from "axios";
// import CardCar from "../components/CardCar.jsx";
// import BrandBar from "../components/brandBar.jsx";
// import { filterCars, getAllCars } from "../store/carFetch";
// import ProfileLandingPage from "../components/NavBarLandingPage.jsx";
// import SearchBar from "../components/searchBar.jsx";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useDispatch, useSelector } from "react-redux";
// import NavBar from "../components/NavBar.jsx";
// import { Animated } from 'react-native';
// const { height, width } = Dimensions.get("screen");
// import CarDetails from  "./carDetails.jsx"
// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

// const AnimatedShimmer = ({ ...props }) => {
//   const shimmerAnimated = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(shimmerAnimated, {
//         toValue: 1,
//         duration: 2000,
//         useNativeDriver: false,
//       })
//     ).start();
//   }, []);

//   const shimmerColors = shimmerAnimated.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: ['white', '#f3f3f3', 'white'],
//   });

//   return (
//     <ShimmerPlaceholder
//       {...props}
//       shimmerColors={shimmerColors}
//     />
//   );
// };

// function Home({ navigation }) {
//   const dispatch = useDispatch();
//   const allCars = useSelector((state) => state.car.allCars);
//   const fixedData = useSelector((state) => state.car.fixedData);
//   const loading = useSelector((state) => state.car.loading);
//   const [refreshing, setRefreshing] = useState(false);
//   const scrollViewRef = useRef();
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [nothing, setNothing] = useState("");
//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     dispatch(getAllCars()).then(() => setRefreshing(false));
//   }, [dispatch]);

//   const updateFilteredCars = (filteredCarData) => {
//     dispatch(filterCars(filteredCarData));
//   };

//   const resetData = () => {
//     dispatch(filterCars(fixedData));
//   };

//   const retrieveToken = async () => {
//     try {
//       const value = await AsyncStorage.getItem("UserToken");
//       if (value !== null) {
//         console.log(value);
//       }
//     } catch (e) {
//       console.error("error coming from home", e);
//     }
//   };

//   useEffect(() => {
//     dispatch(getAllCars());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!loading && scrollViewRef.current) {
//       scrollViewRef.current.scrollTo({
//         x: 0,
//         y: scrollPosition,
//         animated: true,
//       });
//     }
//   }, [loading]);
//   return (
//     <View style={styles.homePage}>
//       <ScrollView
//         ref={scrollViewRef}
//         onScroll={(event) => {
//           setScrollPosition(event.nativeEvent.contentOffset.y);
//         }}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         <ProfileLandingPage style={styles.header} />
//         <SearchBar onSearch={updateFilteredCars} />
//         <BrandBar onFilterByBrand={updateFilteredCars} resetData={resetData} />
//         {!loading ? (
//           allCars?.map((element, i) => (
//             <View style={styles.allcars} key={i}>
//               <CardCar setNothing={setNothing} key={i} oneCar={element} />
//             </View>
//           ))
//         ) : (
//           <>
//             <View style={{ alignItems: "center", paddingTop: 20 }}>
//               <View
//                 style={{
//                   width: width * 0.9,
//                   borderRadius: 10,
//                   overflow: "hidden",
//                   backgroundColor: "white",
//                   padding: 10,
//                 }}
//               >
//                 <AnimatedShimmer
//                   style={{
//                     width: "100%",
//                     height: width * 0.374,
//                     borderRadius: 10,
//                   }}
//                 />
//                 <AnimatedShimmer
//                   style={{
//                     width: "100%",
//                     height: width * 0.15,
//                     marginTop: 10,
//                     borderRadius: 10,
//                   }}
//                 />
//               </View>
//             </View>
//             <View style={{ alignItems: "center", paddingTop: 20 }}>
//               <View
//                 style={{
//                   width: width * 0.9,
//                   borderRadius: 10,
//                   overflow: "hidden",
//                   backgroundColor: "white",
//                   padding: 10,
//                 }}
//               >
//                 <AnimatedShimmer
//                   style={{
//                     width: "100%",
//                     height: width * 0.374,
//                     borderRadius: 10,
//                   }}
//                 />
//                 <AnimatedShimmer
//                   style={{
//                     width: "100%",
//                     height: width * 0.15,
//                     marginTop: 10,
//                     borderRadius: 10,
//                   }}
//                 />
//               </View>
//             </View>
//           </>
//         )}
//         <CarDetails/>
//       </ScrollView>
//       <NavBar />
//     </View>
//   )};
//   const styles = StyleSheet.create({
//     header: {
//       paddingBottom: 10,
//       paddingTop: 20,
//     },
//     SearchBar: {},
//     NavBar: {
//       height: height * 0.05,
//     },
//     homePage: {
//       flex: 1,
//       backgroundColor: "rgb(233, 231, 238)",
//       alignItems: "center",
//       justifyContent: "center",
//       gap: 10,
//     },
//     searchContainer: {},
//     allcars: {
//       padding: 20,
//       paddingBottom: 20,
//     },
//   });

//   export default Home;
