import React from "react";
import { useEffect } from "react";
import {   View,   Text,   Button,   Image,  StyleSheet,   TouchableOpacity, } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getallCarByAgency } from "../store/carFetch";

function MyCars (){

    const dispatch = useDispatch();
    
    const agencyCars = useSelector((state) => state.car.agencyCar);

console.log('here',agencyCars)
useEffect(() => {
    dispatch(getallCarByAgency());
  }, [dispatch]);

return(
    <View>
        <Text>My Cars</Text>
    </View>
)
}
const styles = StyleSheet.create({

})
export default MyCars