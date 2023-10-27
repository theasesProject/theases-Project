import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../redux/carFetch';
import CardCar from '../components/carCard';
import ProfileLandingPage from '../components/NavBarLandingPage';
import SearchBar from "../components/searchBar"

function Home({ navigation }) {
  const dispatch = useDispatch();
  const allCars = useSelector((state) => state.car.allCars);
  const loading = useSelector((state) => state.car.loading);
console.log(allCars, loading);
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <View style={styles.homePage}>
  
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <ProfileLandingPage/>
      <SearchBar/>
        {allCars.map((element, i) => (
          <CardCar key={i} oneCar={element} />
       ) )}
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
