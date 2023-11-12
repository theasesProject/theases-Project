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
function AgencyProfileUser({navigation}){
const ag= useSelector(OneAgency)


    const route = useRoute();
    const dispatch = useDispatch();
    const { agencyId } = route.params;


console.log('herrre front ',ag.agencyCars,'heeeerrreee selim');  


useEffect(()=>{
    dispatch(getOne(agencyId));

},[dispatch])
const us= useSelector(OneUserbid)

    return (
<View>
      <View style={styles.trial}>
        <View style={styles.trle}>
          <Pressable onPress={()=>navigation.navigate('Home')}>
          <Left />
          </Pressable>
        </View>

        <View style={styles.trri}>
          <Pressable
            style={styles.trri}
     
          >
            <Dots />
          </Pressable>
        </View>
      </View>
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



        </ScrollView>

   
       

        
        </View>
        <View style={styles.foot}> 
          {/* <NavBar /> */}
        </View>
   
    </View>




    )
}
const styles = StyleSheet.create({
    trial: {
      height: "6%",
      width: width,
      // backgroundColor:'green',
      flexDirection: "row",
      paddingHorizontal: width * 0.07,
      alignItems: "center",
      justifyContent: "space-between",
    },
    trle: {
      // flex: 1,
      // paddingRight: 200,
      // backgroundColor:'red'
    },
    trri: {
      width: width * 0.1,
    },
  
    agency: {
    //   zIndex: 0,
      width: width,
      height: "94%",
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
  });
export default AgencyProfileUser