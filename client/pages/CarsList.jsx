import { StyleSheet, Text, View, Dimensions, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
const { height, width } = Dimensions.get("screen");
import { useNavigation, useRoute } from '@react-navigation/native';
import CarCard from '../components/CarCard';
import FilterButtons from '../components/FilterButtons';

const CarsList = () => {
  const route = useRoute();
  const { filteredCars,markedDates } = route.params;



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          <Ionicons name="close" size={24} color="black" style={styles.icon} />
        </Pressable>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Pressable style={styles.update}>
          <View>
            <Text style={styles.location}>Frankfurt Airport</Text>
            <Text style={styles.date}>27 Apr | 12:00 - 29 Apr | 12:00</Text>
          </View>
          <Ionicons name="create" size={24} color="black" style={styles.icon} />
        </Pressable>
        <FilterButtons />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        {filteredCars?.map((car, index) => (
          <CarCard key={index} car={car} markedDates={markedDates} />
        ))}
      </ScrollView>
    </View>
  );
}

export default CarsList;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flex: 1,
    alignItems: 'center',
  },
  header: {
    marginTop: height * 0.06,
    alignItems: 'flex-start',
    width: width * 1,
    paddingHorizontal: width * 0.05,
  },
  update: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.015,
    alignItems: 'center',
    backgroundColor: "#ECECEC",
    width: width * 0.9,
    borderRadius: 15,
  },
  location: {
    fontSize: 13,
    fontWeight: '600',
  },
  date: {
    fontSize: 11,
  },
  scroll: {
    gap: 15,
    paddingBottom: height * 0.05,
  },
});
