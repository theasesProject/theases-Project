import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CustomTimePicker = () => {
 const [selectedTime, setSelectedTime] = useState('00:00');

 // Generate time options
 const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(time);
      }
    }
    return options;
 };

 const timeOptions = generateTimeOptions();

 // Find the index of the current, previous, and next values
 const findCurrentPreviousNextIndexes = () => {
    const currentIndex = timeOptions.indexOf(selectedTime);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : timeOptions.length - 1;
    const nextIndex = currentIndex < timeOptions.length - 1 ? currentIndex + 1 : 0;
    return { currentIndex, previousIndex, nextIndex };
 };

 const { currentIndex, previousIndex, nextIndex } = findCurrentPreviousNextIndexes();

 const renderItem = ({ item, index }) => {
    const isCurrent = index === currentIndex;
    const isPrevious = index === previousIndex;
    const isNext = index === nextIndex;

    return (
      <TouchableOpacity
        onPress={() => setSelectedTime(item)}
        style={[styles.item, isCurrent && styles.currentItem, isPrevious && styles.previousItem, isNext && styles.nextItem]}
      >
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    );
 };

 return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time:</Text>
      <FlatList
        data={[timeOptions[currentIndex], timeOptions[previousIndex], timeOptions[nextIndex]]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
 },
 title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
 },
 item: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
 },
 currentItem: {
    backgroundColor: '#D9E3F0',
 },
 previousItem: {
    backgroundColor: '#E9ECEF',
 },
 nextItem: {
    backgroundColor: '#E9ECEF',
 },
 itemText: {
    fontSize: 16,
 },
});

export default CustomTimePicker;
