import React from 'react';
import { View, Text, Image, StyleSheet,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const CarRentalCard = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/car2.png')} style={styles.carImage} resizeMode='contain' />
      <View style={styles.content}>
        <Text style={styles.carName}>Mercedes</Text>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTimeLabel}>From:</Text>
          <Text style={styles.dateTime}>12/2/2014</Text>
        </View>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTimeLabel}>To:</Text>
          <Text style={styles.dateTime}>12/5/2014</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:width*0.9,
    maxWidth:'100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  carImage: {
    width: width*0.3,
    height: height*0.12,
    borderRadius: 10,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateTimeLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  dateTime: {
    fontSize: 16,
  },
});

export default CarRentalCard;
