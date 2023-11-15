import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import { logUserOut, selectUser } from "../store/userSlice";
import Logo from "../assets/tempLogo.png";
import NavBarAgency from "../components/NavBarAgency";
import Chart from "../components/Stats";
import backArrow from "../assets/Svg/left-long-solid.svg";
import Options from "../assets/Svg/three-dots-svgrepo-com.svg";
import SliderMenu from "../components/SideBar";
import TrueIcon from "../assets/Svg/true.svg";
import FalseIcon from "../assets/Svg/false.svg";
const { width, height } = Dimensions.get("screen");

const AgencyProfile = ({ navigation }) => {
  // ****************************************************************
  const activeUser = useSelector(selectUser);
  console.log(activeUser);
  // ****************************************************************
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleSliderToggle = () => {
    setSliderOpen(!isSliderOpen);
  };

  return (
    <View style={styles.agencyProfile}>
      <View style={styles.topSection}>
        <View style={styles.navBar}>
          <Image style={styles.backArrow} source={backArrow} />
          {/* <Image /> */}
        </View>
        <View style={styles.logosContainer}>
          <View style={styles.agencyLogoContainer}>
            <Image style={styles.agencyLogo} source={activeUser.avatar} />
          </View>
          <View style={styles.appLogoContainer}>
            <Image style={styles.appLogo} source={Logo} />
          </View>
        </View>
      </View>
      <ScrollView style={styles.dinamicPart}>
        <View style={styles.agencyInfo}>
          <View style={styles.leftSection}></View>
          <View style={styles.rightSection}></View>
        </View>
        <View style={styles.agencyStats}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>statistics</Text>
          </View>
          <View style={styles.chartContainer}>
            <Chart />
          </View>
        </View>
        <View style={styles.agencyReviews}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  agencyProfile: {
    flex: 1,
  },
  topSection: {
    // backgroundColor: "red",
    height: height * 0.2,
    borderBottomWidth: 1,
    borderColor: "#6a78c1",
    flexDirection: "column",
  },
  navBar: {
    width: width,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    // backgroundColor: "white",
    height: height * 0.05,
    alignItems: "center",
    justifyContent: "space-between",
  },
  backArrow: {
    width: width * 0.05,
    height: height * 0.02,
  },
  logosContainer: {
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.025,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  agencyLogoContainer: {
    width: width * 0.23,
    height: height * 0.103,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#6a78c1",
  },
  agencyLogo: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  appLogoContainer: {
    width: width * 0.5,
    height: height * 0.05,
  },
  appLogo: {
    width: "100%",
    height: "100%",
  },
  dinamicPart: {
    // backgroundColor: "blue",
    minHeight: height * 0.8,
    paddingHorizontal: width * 0.02,
  },
  agencyInfo: {
    paddingVertical: height * 0.015,
    // backgroundColor: "orange",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    width: width * 0.45,
    height: height * 0.13,
    borderRadius: 15,
    // backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#6a78c1",
  },
  rightSection: {
    width: width * 0.45,
    height: height * 0.13,
    borderRadius: 15,
    // backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#6a78c1",
  },
  agencyStats: {
    flexDirection: "column",
    gap: height * 0.015,
  },
  headerContainer: {
    width: width,
    alignItems: "center",
    // backgroundColor: "grey",
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    // backgroundColor: "red",
    letterSpacing: 5,
    textTransform: "uppercase",
  },
  chartContainer: {
    width: width,
  },
  agencyReviews: {},
});
export default AgencyProfile;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Image,
//   ImageBackground,
//   ScrollView,
//   Pressable,
// } from "react-native";
// import { useSelector } from "react-redux";
// import { logUserOut, selectUser } from "../store/userSlice";
// import bg from "../assets/tempLogo.png";
// import NavBarAgency from "../components/NavBarAgency";
// import Stats from "../components/Stats";
// import Left from "../assets/Svg/left-long-solid.svg";
// import Dots from "../assets/Svg/three-dots-svgrepo-com.svg";
// import SliderMenu from "../components/SideBar";
// import TrueIcon from "../assets/Svg/true.svg";
// import FalseIcon from "../assets/Svg/false.svg";
// const { width, height } = Dimensions.get("screen");

// function AgencyProfile({ navigation }) {
//   // ****************************************************************
//   const activeUser = useSelector(selectUser);
//   // ****************************************************************
//   const [isSliderOpen, setSliderOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);

//   const handleSliderToggle = () => {
//     setSliderOpen(!isSliderOpen);
//   };
//   return (
//     <View style={styles.agencyProfile}>
//       <View style={styles.trial}>
//         <View style={styles.trle}>
//           <Pressable onPress={() => navigation.navigate("Home")}>
//             <Left />
//           </Pressable>
//         </View>

//         <View style={styles.trri}>
//           <Pressable
//             style={styles.trri}
//             onPress={() => {
//               handleSliderToggle();
//             }}
//           >
//             <Dots />
//           </Pressable>
//         </View>
//       </View>
//       <View style={styles.agency}>
//         <SliderMenu
//           isOpen={isSliderOpen}
//           onClose={handleSliderToggle}
//           navigation={navigation}
//         />
//         {isVisible && activeUser?.Agency ? (
//           <ScrollView>
//             <View style={styles.vbgImg}>
//               <ImageBackground source={bg} style={styles.bgim} />
//             </View>
//             <View style={styles.vav}>
//               <View style={styles.bvav}>
//                 <Image
//                   source={{
//                     uri: activeUser?.avatar,
//                   }}
//                   style={styles.avatar}
//                 />
//               </View>
//             </View>

//             <View style={styles.acna}>
//               <View style={styles.leftSection}>
//                 <Text style={styles.leac}>{activeUser?.Agency.name}</Text>
//                 <Text style={styles.number}>
//                   {activeUser?.Agency.companyNumber}
//                 </Text>
//               </View>
//               <View style={styles.rightSection}>
//                 <View style={styles.delivery}>
//                   <Text style={styles.deliveryText}>Delivery:</Text>
//                   {activeUser?.Agency.transportation ? (
//                     <TrueIcon />
//                   ) : (
//                     <FalseIcon />
//                   )}
//                 </View>
//                 <Text style={styles.createdAt}>
//                   {activeUser?.Agency.createdAt.slice(0, 10)}
//                 </Text>
//                 {/* <Image source={dots} /> */}
//               </View>
//             </View>
//             <View style={styles.stats}>
//               <Stats />
//             </View>
//           </ScrollView>
//         ) : null}
//         <View style={styles.foot}>
//           <NavBarAgency />
//         </View>
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   agencyProfile: {},
//   trial: {
//     height: "6%",
//     width: width,

//     flexDirection: "row",
//     paddingHorizontal: width * 0.07,
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   trle: {},
//   trri: {
//     width: width * 0.1,
//   },

//   agency: {
//     zIndex: 0,
//     width: width,
//     height: "94%",
//   },
//   vbgImg: {
//     height: height * 0.25,
//     width: width,
//     borderBottomColor: "#6a78c1",
//     borderBottomWidth: 2,
//   },
//   bgim: {
//     height: "88%",
//     width: "100%",
//   },
//   vav: {
//     marginTop: -height * 0.07,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   bvav: {
//     marginTop: -height * 0.02,
//   },
//   avatar: {
//     height: height * 0.12,
//     width: width * 0.26,
//     borderWidth: 2,
//     borderColor: "#6a78c1",
//     borderRadius: 75,
//   },
//   acna: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//     // backgroundColor: "red",
//   },
//   leftSection: {
//     flex: 1,
//     marginTop: -height * 0.05,
//     // backgroundColor: "red",
//     paddingHorizontal: width * 0.03,
//     paddingVertical: height * 0.01,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: height * 0.02,
//     borderRadius: 10,
//     borderColor: "#6a78c1",
//     borderWidth: 1,
//   },
//   leac: {
//     fontSize: 21,
//     fontStyle: "italic",
//     color: "#6a78c1",
//     fontWeight: "bold",
//   },
//   rightSection: {
//     width: "100%",
//     backgroundColor: "red",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: -height * 0.05,
//     marginLeft: width * 0.4,
//     flex: 1,
//     gap: height * 0.02,
//     borderRadius: 10,
//     borderColor: "#6a78c1",
//     borderWidth: 1,
//     // paddingHorizontal: width * 0.02,
//     paddingVertical: height * 0.01,
//   },
//   delivery: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//   },
//   deliveryText: {
//     fontWeight: "bold",
//     color: "#6a78c1",
//   },
//   createdAt: {
//     fontWeight: "bold",
//     color: "#6a78c1",
//   },
//   stats: {
//     height: height * 0.5,
//     padding: 20,
//   },
//   map: {
//     height: height * 0.15,
//     width: width * 0.5,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   btn: {
//     justifyContent: "center",
//     height: height * 0.05,
//     width: width * 0.2,

//     alignItems: "center",
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   temap: { fontSize: 25, color: "lightblue" },
//   foot: {
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
// });
// export default AgencyProfile;
