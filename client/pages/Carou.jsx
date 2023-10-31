import * as React from 'react';
import { Dimensions, Text, View ,StyleSheet,TouchableOpacity,Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import frim from '../assets/Fst-removebg-preview.png';
import scim from '../assets/secondpage-removebg-preview.png';
import thim from '../assets/ddd.png';
function Carou() {
    const [activeSlide, setActiveSlide] = React.useState(0);
    const width = Dimensions.get('window').width;
    const data = [
        {
          id: '1',
          text: 'Download App',
          fotext: "Next",
          Thtext: "Skip",
          secondText: "Welcome to [Your App Name] We're thrilled you've chosen us. Stay tuned for updates and enjoy your journey with us!",
          image: frim,
        },
        {
          id: '2',
          text: 'Select a Car',
          fotext: "Next",
          Thtext: "Skip",
          secondText: "At [Your Business Name], you can rent a car and start your journey effortlessly!",
          image: scim,
        },
        {
          id: '3',
          text: 'Enjoy your Ride',
          fotext: "Login",
          Thtext: " ",
          secondText: "At [Your Business Name], you can rent a car and start your journey effortlessly!",
          image: thim,
        },
      ];

      const renderItem = ({ item }) => (
               <View style={styles.slide}>
                {console.log(item.image)}
                 <Image source={item.image} style={styles.image}></Image> 
                 <Text style={styles.text}>{item.text}</Text>
                 <Text style={styles.stext}>{item.secondText}</Text>
               </View>
             );
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                
                autoPlay={false}
                data={data}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setActiveSlide(index)}
                renderItem={renderItem}
            />
        <View style={styles.footer}>
           <View style={styles.footerLeft}>
           <TouchableOpacity onPress={() => navigation.navigate("Login")}>

             <Text style={styles.skiptext}>
               {activeSlide === 2 ? null : "Skip"}
             </Text>
             </TouchableOpacity>
           </View>
           <View style={styles.indicatorContainer}>
             {data.map((_, index) => (
               <View
                 key={index}
                 style={[
                   styles.indicator,
                   activeSlide === index ? styles.activeIndicator : null,
                 ]}
               />
             ))}
           </View>
           <View style={styles.footerRight}>
           <TouchableOpacity onPress={() => activeSlide === 2 ?navigation.navigate("Login"):null}>

             <Text style={styles.next}>
               {activeSlide === 2 ? "Login" : "Next"}
             </Text>
             </TouchableOpacity>
           </View>
         </View>
       </View>
     );
   };
  
   const styles = StyleSheet.create({
     container: {
       flex: 1,
     },
     slide: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
     },
     image: {
       width: 200,
       height: 200,
     },
     text: {
       fontSize: 24,
       fontWeight: 'bold',
     },
     stext: {
       fontSize: 16,
       width:250,
     },
     skiptext: {
       fontSize: 18,
       textAlign: 'left',
       color: 'blue',
     },
     footer: {
       flexDirection: 'row',
       alignItems: 'center',
       padding: 10,
     },
     footerLeft: {
       flex: 1,
     },
     indicatorContainer: {
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'center',
     },
     indicator: {
       width: 25,
       height: 5,
       borderRadius: 5,
       backgroundColor: 'gray',
       margin: 5,
     },
     activeIndicator: {
       backgroundColor: 'blue',
     },
     footerRight: {
       flex: 1,
       alignItems: 'flex-end',
     },
     next: {
       textAlign: 'right',
       fontSize: 18,

     },
   });
export default Carou;