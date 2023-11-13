import { Text, View, StyleSheet, Dimensions, ImageBackground, TextInput, TouchableOpacity,  Image,  ScrollView, Pressable,  Modal, Button,} from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useRoute } from '@react-navigation/native';
const { width, height } = Dimensions.get("screen");
import Left from "../assets/Svg/left-long-solid.svg";
import Dots from "../assets/Svg/three-dots-svgrepo-com.svg";
import { getOne ,OneAgency} from "../store/agencySlice";
import { useDispatch, useSelector } from "react-redux";
import {  OneUserbid, getOneById } from "../store/userSlice";
import { getallCarByAgency } from "../store/carFetch";
import CardCar from "../components/CardCar";
import car from "../assets/car2.png";

function AgencyProfileUser({navigation}){
const ag= useSelector(OneAgency)
const agencyCars = useSelector((state) => state.car.agencyCar);
const loading = useSelector((state) => state.car.loading);

    const route = useRoute();
    const dispatch = useDispatch();
    const { agencyId } = route.params;


  
console.log(ag,'agency here');
// const handleHeartPress = async () => {
//   // setHeartSelected(!heartSelected);
//   // if (!heartSelected) {
//   setHeartClicked(!isHeartClicked);

//   dispatch(CreateBookMark({ CarId: oneCar.id, UserId: activeUser.id }));
//   // } else if (heartSelected) {
//   // dispatch(removedBookMark(oneCar.id));
//   // }
// };

useEffect(()=>{
    dispatch(getallCarByAgency(agencyId));
dispatch(getOne(agencyId))
},[dispatch])
const handleRent = async () => {
  // dispatch(carDetail(oneCar));
  // dispatch(saveDetails(oneCar));
  handlePress();
};

    return (
<View>
      
      <View style={styles.agency}>
        <ScrollView>
        <View style={styles.vbgImg}>
              <ImageBackground
source={{
    uri: ag?.agencyById?.backgroundImage,
  }}
                style={styles.bgim}
              />
            </View>
            <View style={styles.vav}>
              <View style={styles.bvav}>
                <Image
                  source={{
                    uri: ag?.userid?.avatar,
                  }}
                  style={styles.avatar}
                />
              </View>
            </View>
            <View style={styles.acna}>
              <View style={styles.leftSection}>
                <Text style={styles.leac}>{ag?.agencyById?.name}</Text>
                <Text style={styles.number}>
                  {ag?.agencyById?.companyNumber}
                </Text>
              </View>
              <View style={styles.rightSection}>
                <Text>
                  {ag?.agencyById?.transportation
                    ? "With Delivery"
                    : "Without Delivery"}
                </Text>
             
              </View>
            </View>
         
           <View style={styles.mape}> 
         { agencyCars?.map((element, i) => (

            <View key={i} style={styles.card}>
            <Pressable style={styles.Image}  onPress={handleRent}>
              {element? (
                // console.log('ele in map',element.car),
                <Image
                  style={styles.carImage}
                  source={{
                    uri: element?.carImage.media,
                  }}
                />
              ) : (
                <Image style={styles.carImage} source={car} /> 
                )} 
      
              
            </Pressable>
            <View style={styles.carDetails}>
              <View style={styles.NameAvaib}>
                <Text style={styles.carName}>{element.car.model}</Text>
                <Text style={styles.avaible}>{element.car.status}</Text>
              </View>
              <View style={styles.PriceStar}>
                <View style={styles.booking}>
                  <Text style={styles.carPrice}>
                    ${element.car.price}/Daily
                  </Text>
                  <View style={styles.bookingCar}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(carDetail(element.car));
                        navigation.navigate("Booking");
                      }}
                    >
                      <Text style={styles.bookingCar1}>Booking</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.reviews}>
                  {/* <TouchableOpacity onPress={handleStarPress}>
                    <Image style={styles.heart} source={starImage} />
                  </TouchableOpacity> */}
                  <Text style={styles.avaible}>(150 review)</Text>
                </View>
              </View>
            </View>
          </View>
        





        )) }
        </View>
        </ScrollView>

   
       
 
        
        </View>
      
    <NavBar />
    </View>




    )
}
const styles = StyleSheet.create({
   
    mape:{
      gap:30,
      paddingHorizontal:30,
    },
   
    agency: {
    //   zIndex: 0,
      width: width,
      height: "93%",
    },
    vbgImg: {
      height: height * 0.25,
      width: width,
      borderBottomColor: "#6a78c1",
      borderBottomWidth: 3,
    },
    bgim: {
      height: "100%",
      width: "100%",
      // objectFit:'cover'
    },
    vav: {
      marginTop: -height * 0.07,
      justifyContent: "center",
      alignItems: "center",
    },
    bvav: {
      // borderRadius: 10,
      //    width:width*0.25,
      // borderWidth: 1.25,
      // padding: 23,
      // height:height*0.12,
    //   marginTop: '5%',
    },
    avatar: {
      height: height * 0.12,
      width: width * 0.25,
      borderWidth: 2,
      borderColor: "#6a78c1",
      borderRadius: 75,
    },
    acna: {
      // flex: 1,
      flexDirection: "row",
    //   padding: 20,
      // height:height*0.01,
      // backgroundColor:"lightgrey",
    },
    leftSection: {
      flex: 1, // Takes up 50% of the container's width
      // backgroundColor: 'lightblue', // Optional background color for the left section
      // height: height * 0.08,
      marginTop: '-10%',
      // marginLeft:height*0.01,
      alignItems: "center",
      // justifyContent: "center",
      // borderWidth: 1,
      // borderRadius: 10,
    },
    leac: {
      fontSize: 21,
      fontStyle: "italic",
    },
    rightSection: {
      // height: height * 0.12,
      // alignItems: "center",
      justifyContent: "center",
      marginTop: -height * 0.06,
      marginLeft: 100,
      flex: 1, // Takes up 50% of the container's width
      // backgroundColor: 'lightgreen', // Optional background color for the right section
    },
    stats: {
      height: height * 0.5,
      padding: 20, // Adjust the value as needed to move the "Stats" section up
      // flex: 1,
      // backgroundColor: "green",
    },
    map: {
      height: height * 0.15,
      width: width * 0.5,
      alignItems: "center",
      justifyContent: "center",
    },
    btn: {
      justifyContent: "center",
      height: height * 0.05,
      width: width * 0.2,
      // backgroundColor: "white",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 5,
    },
    temap: { fontSize: 25, color: "lightblue" },
    foot: {
      justifyContent: "flex-end", // Align the component to the bottom
      alignItems: "center",
      backgroundColor: "green",
    },
    card: {
      backgroundColor: "white",
      height: height * 0.35,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      paddingVertical: 110,
      
    },
    barText: {
      width: 360,
      height: 35,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  
    carImage: {
      width: width * 0.8,
      height: 150,
    },
    heart: {
      width: 30,
      height: 28,
    },
    Image: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-start",
      gap: 10,
      height: 150,
    },
    NameAvaib: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 180,
    },
    PriceStar: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    reviews: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      gap: 10,
    },
    carName: {
      fontSize: 18,
      fontWeight: "bold",
      color: "black",
    },
    avaible: {
      fontSize: 15,
      fontWeight: "bold",
      color: "green",
    },
    carPrice: {
      fontSize: 17,
      paddingLeft: width * 0.5,
      fontWeight: "bold",
      color: "#6C77BF",
      fontSize: 14,
      color: "rgb(130, 124, 140)",
    },
    carPrice: {
      fontSize: 18,
      fontWeight: "bold",
      color: "rgb(172, 133, 234)",
    },
    bookingCar: {
      borderWidth: 2,
      width: 120,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "lightgrey",
      borderRadius: 5,
      backgroundColor: "lightblue",
    },
    bookingCar1: {
      fontSize: 16,
      fontWeight: "bold",
    },
  });
export default AgencyProfileUser