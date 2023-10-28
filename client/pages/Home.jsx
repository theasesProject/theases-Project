import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
import CardCar from '../components/CardCar.jsx'


import ProfileLandingPage from '../components/NavBarLandingPage.jsx';
import SearchBar from "../components/searchBar.jsx"
// import { getAllCars } from '../redux/carFetch.jsx';

function Home({ navigation }) {
//   const dispatch = useDispatch();
//   const allCars = useSelector((state) => state.car.allCars);
//   const loading = useSelector((state) => state.car.loading);
// console.log(allCars, loading);
//   useEffect(() => {
//     dispatch(getAllCars());
//   }, [dispatch]);

  return (
    <View style={styles.homePage}>
  
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <Text>Hello</Text> */}
      <ProfileLandingPage/>
      <SearchBar/>
      
          {/* <CardCar />,
          <CardCar />,
          <CardCar />,
          <CardCar />,
          <CardCar />,
          <CardCar />,
          <CardCar />,
          <CardCar /> */}
     
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: 'rgb(219, 217, 224)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:"15%"
  },


});

export default Home;
