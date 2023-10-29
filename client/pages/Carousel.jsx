// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native'; // Use StyleSheet from 'react-native'

// import Carousel from 'react-native-snap-carousel';

// import frim from '../assets/Fst.png'
// import scim from  '../assets/secondpage.png'
// import thim from '../assets/thd.png'

// const data = [
//   { id: '1', text: 'Item 1', image: frim },
//   { id: '2', text: 'Item 2', image: scim }, // Corrected the image property
//   { id: '3', text: 'Item 3', image: thim }, // Corrected the image property
// ];

// const MyCarousel = () => {
//   const renderItem = ({ item }) => (
//     <View style={styles.slide}>
//       <Image source={item.image} style={styles.image} />
//       <Text style={styles.text}>{item.text}</Text>
//     </View>
//   );

//   return (
//     <Carousel
//       data={data}
//       renderItem={renderItem}
//       sliderWidth={300}
//       itemWidth={300}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   slide: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 250,
//     height: 250,
//   },
//   text: {
//     fontSize: 20,
//   },
// });

// export default MyCarousel;
