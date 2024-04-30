import { StyleSheet, Text, View, Pressable, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import GearIcon from '../assets/Svg/gear.svg'
import CarDoor from '../assets/Svg/carDoor.svg'
import Tick from '../assets/Svg/tick.svg'
const { height, width } = Dimensions.get("screen");

const CarCard = () => {
  return (
    <Pressable style={styles.cardContianer}>
      <ImageBackground style={styles.bg} resizeMode='cover' source={require('../assets/cardCover.png')}>
        <View style={styles.content}>
            <View style={styles.titleWrapper}>
        <Text style={styles.title}>Audi A10 Automatique</Text>
        <Text style={styles.titleDetails}>or similar | convertible</Text>
        </View>
        <View style={styles.iconsRow}>
        <View style={styles.firstRow}>
        <Ionicons name="person" size={15} color="white" style={styles.icon} />   
        <Text style={styles.details}>4</Text>
        </View>
        <View style={styles.firstRow}>
        <GearIcon/>
        <Text style={styles.details}>Manual</Text>
        </View>
        <View style={styles.firstRow}>
        <CarDoor/>
 
        <Text style={styles.details}>2</Text>
        </View>
        </View>
        </View>
        <View style={styles.cardFooter}>
            <View style={styles.secondRow}>
                <Tick/>
         <Text style={styles.footerDetails}>Incl. 900km</Text>
         </View> 
         <View style={styles.thirdRow}>
            <Text style={styles.price}>TND 120/day</Text>
            <Text style={styles.totalPrice}>TND 360 total</Text>
            </View> 
        </View>
      </ImageBackground>
    </Pressable>
  )
}

export default CarCard

const styles = StyleSheet.create({
    cardContianer: {
        // backgroundColor: 'red',
        width: width * 0.9,
        height: height * 0.5,
        borderRadius: width*0.05,
        overflow: 'hidden'
    },
    bg: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent:'space-between'
    },
    titleWrapper:{
        gap:8
    },
    title:{
        fontSize:16,
        color:'white',
        fontWeight:'500'
    },
    details:{
        fontSize:12,
        color:'#fff',
        fontWeight:'300'
    },
    content:{
     padding:width*0.05  ,
     gap:10     
    },
    firstRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:5,
        backgroundColor:'grey',
        borderRadius:20,
        alignItems:'center',
        justifyContent:"center",
        height:height*0.04,
        paddingHorizontal:width*0.05
    },          
    iconsRow:{
        flexDirection:'row',
        gap:10
    },
    cardFooter:{
        padding:width*0.05,
        
    },
    footerDetails:{
        fontSize:12,
        color:'white',
        fontWeight:"300",
    },
    secondRow:{
        alignItems:'center',
        flexDirection:'row'
    },
    price:{
        color:'white',
        fontSize:18,
        fontWeight:'500'
    },
    totalPrice:{
        color:'white',
        fontWeight:'100',
        fontSize:12
    },
    thirdRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:8
    },
    titleDetails:{
        fontSize:12,
        color:'#fff',
        fontWeight:'100'
    }

})
