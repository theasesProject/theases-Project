
import React, { useEffect } from "react";

import { View, Text, StyleSheet, ScrollView, Button ,TouchableOpacity} from 'react-native';
import CardCar from "../components/cardCar.jsx"
import BrandBar from "../components/brandBar.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../store/carFetch';
import ProfileLandingPage from "../components/NavBarLandingPage.jsx";
import SearchBar from "../components/searchBar.jsx";

function Home({ navigation }) {
  const dispatch = useDispatch();
  const allCars = useSelector((state) => state.car.allCars);
  const loading = useSelector((state) => state.car.loading);
console.log(allCars, loading);
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);


  return (
    <View   options={{ headerShown: true }}  style={styles.homePage}>
      <ScrollView >
     
      <ProfileLandingPage     />
     
      <SearchBar/>
      <BrandBar/>
      {allCars.map((element, i) => (
        <View style={styles.allcars}>
          <CardCar key={i} oneCar={element} />
          </View>
       ) )}
   
     
      </ScrollView> 
        
    </View>
  );
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: "rgb(219, 217, 224)",
    alignItems: "center",
    justifyContent: "center",
  gap:10
  },
  allcars:{
   paddingBottom:20
  }
 
});

export default Home;
