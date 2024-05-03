import { StyleSheet, Text, View,Dimensions,ImageBackground,Pressable, Image,ScrollView } from 'react-native'
import React from 'react'
import ArrowBack from '../assets/Svg/goBack.svg'
import { Ionicons } from '@expo/vector-icons';


const { height, width } = Dimensions.get("screen");

const NewProfile = () => {
  return (
    <View style={{flexGrow:1}}>
        <ScrollView contentContainerStyle={styles.scroll}>
      <ImageBackground resizeMode='cover' style={styles.bg} source={require('../assets/profilePic.jpeg')}>
        <Pressable style={styles.arrowContainer}>
      <ArrowBack />
      </Pressable>
      <Image style={styles.logo} source={require('../assets/aqwaBlack.png')}/>
      <View style={styles.secondRow}>
      <Text style={styles.title}>Hello,</Text>
         <Text style={styles.title}>Wissem</Text>
         </View> 
      </ImageBackground>
      <Text style={styles.information}>Personal Information</Text>
      <View style={styles.container}>
      <Pressable style={styles.button}>
        <Ionicons name="calendar" size={25} color="black" />
        <Text style={styles.titleIcon}>Bookings</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Ionicons name="person" size={25} color="black" />
        <Text style={styles.titleIcon}>My Information</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Ionicons name="log-out" size={25} color="black" />
        <Text style={styles.titleIcon}>Logout</Text>
      </Pressable>
      </View>

      <Text style={styles.information}>Support</Text>
      <View style={styles.container}>
      <Pressable style={styles.button}>
        <Ionicons name="help-circle" size={25} color="black" />
        <Text style={styles.titleIcon}>FAQs</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Ionicons name="book" size={25} color="black" />
        <Text style={styles.titleIcon}>Legal</Text>
      </Pressable>
      </View>
      </ScrollView>
    </View>
  )
}

export default NewProfile

const styles = StyleSheet.create({
    bg: {
        height:height*0.4,
        // borderRadius: 20,
        overflow: 'hidden',
        justifyContent:'space-between'
    },
    arrowContainer:{
        paddingHorizontal:width*0.06,
        paddingVertical:height*0.04
    },
    footerDetails:{
        fontSize:12,
        color:'white',
        fontWeight:"300",
    },
    logo: {
        position:'absolute',
        top:-10,
        left:60,
        width: width * 0.7,
        height: height * 0.2
      },
      title:{
        fontSize:22,
        color:'white',
        fontWeight:'900',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    secondRow: {
        height: height * 0.078,
        paddingHorizontal: width*0.05,
        gap: 5,
      },

        container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    width: width*0.4,
    height: height*0.15,
    margin: 10,
    borderRadius: 10,
  },
  titleIcon: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
    fontSize:13,
    fontWeight:'500'
  },
  information:{
    fontSize:22,
    color:'black',
    fontWeight:'900',
    paddingHorizontal:width*0.06,
    paddingVertical:height*0.015
  },
  scroll:{
    paddingBottom:height*0.05
  }
})