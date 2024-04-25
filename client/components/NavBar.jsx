import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Updated to MaterialIcons

const { width, height } = Dimensions.get("window");

// Define the position object outside the component
const position = {
 NewHome: 0,
 Search: width * 0.25,
 History: width * 0.5,
 Profile: width * 0.75,
};

const NavTab = () => {
 const route = useRoute();
 const navigation = useNavigation();
 const [slideAnim] = useState(new Animated.Value(position[route.name])); // Initialize slideAnim with the current route's position

 useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: position[route.name],
      useNativeDriver: false,
      bounciness: 10, 
    }).start();
 }, [route]);

 const handlePress = (tabName) => {
    navigation.navigate(tabName);
 };

 return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => handlePress('NewHome')}>
        <Icon name="home" size={20} color={route.name === 'Home' ? '#8c52ff' : '#bdbdbd'} />
        {route.name === 'Home' && <Text style={[styles.tabText, { color: '#8c52ff' }]}>Home</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => handlePress('Search')}>
        <Icon name="search" size={20} color={route.name === 'Search' ? '#8c52ff' : '#bdbdbd'} />
        {route.name === 'Search' && <Text style={[styles.tabText, { color: '#8c52ff' }]}>Search</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => handlePress('History')}>
        <Icon name="history" size={20} color={route.name === 'History' ? '#8c52ff' : '#bdbdbd'} />
        {route.name === 'History' && <Text style={[styles.tabText, { color: '#8c52ff' }]}>History</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => handlePress('Profile')}>
        <Icon name="person" size={20} color={route.name === 'Profile' ? '#8c52ff' : '#bdbdbd'} />
        {route.name === 'Profile' && <Text style={[styles.tabText, { color: '#8c52ff' }]}>Profile</Text>}
      </TouchableOpacity>
      <Animated.View style={[styles.tabIndicator, { transform: [{ translateX: slideAnim }]}]} />
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
    height: height * 0.09,
    width: width * 1,
 },
 tab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.25,
    height: height * 0.1
 },
 tabText: {
    fontSize: 14,
    marginTop: 4,
 },
 tabIndicator: {
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#8c52ff', // Updated color
    height: 3,
    width: width * 0.25,
 },
});

export default NavTab;