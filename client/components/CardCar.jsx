import { View ,Text, StyleSheet,Image,TouchableOpacity} from "react-native";
import {useState} from "react"
import car2 from "../assets/car2.png"
import emptyStar from "../assets/etoile.png"
import purpleHeart from "../assets/etoile.png"
import filledStar from "../assets/etoile.png"

import heartBleu from "../assets/heartBleu.png"
function CardCar({oneCar,onPress}) {
   const [starSelected, setStarSelected] = useState(false)
   const [heartSelected, setHeartSelected] = useState(false)
   const starImage=starSelected ? filledStar :emptyStar;
   const heartImage=heartSelected? heartBleu : purpleHeart;
const handleStarPress = () => {
          setStarSelected(!starSelected);
       };
   const handleHeartPress =()=>{
      setHeartSelected(!heartSelected)
      console.log("etoile")
   }
 



   
    return (
      <View style={styles.card}>
      <View>
      <TouchableOpacity onPress={handleHeartPress}>
   <Image source={heartImage} style={styles.emptyHeart} />
     </TouchableOpacity>
          <Image source={car2} style={styles.car} />
   
        </View>
  <View>
  <Text style={styles.cartext}>Automatic</Text>
  <TouchableOpacity onPress={handleStarPress}>
  <Image source={starImage} style={{ width: 32, height: 32,marginLeft:-290 }} />
    </TouchableOpacity>
  <Text style={styles.numetoile}>3 (75 reviews)</Text>
  

  <Text style={styles.price}>$550/day</Text>
  <Text style={styles.type}>Fuel</Text>
  </View>
  
    </View>

    )
    }



const styles = StyleSheet.create({
   price: {
      marginTop: -19,
      marginLeft: -87,
      fontSize: 18,
          fontWeight: "bold",
      color: "rgb(72, 76, 173)",
    },
    type: {
      marginTop: -50,
      fontSize: 14,
         color: "rgb(130, 124, 140)",
         marginLeft: -50,
    
   
    },
    numetoile:{
      marginTop:-25,
      marginLeft:-250, 
      fontSize: 12,
    color: "rgb(130, 124, 140)"
    }
    ,  cartext: {
      marginTop: 110,
      marginLeft: -290,
      fontSize: 18,
     fontWeight: "bold",
        color: "black"
      
    },
     car:{
    width: 300,
    height: 148,
    borderRadius: 25,
  marginTop: -45,
  marginLeft:-10
  },
    card: {
      width: "100%",
      height: 200,
      backgroundColor: 'white',
      shadowColor: 'black',
      padding: 10,
      display: 'flex',
      flexDirection: 'row',
      padding: 10,
      borderRadius: 10,
      // marginLeft: 15,
      marginTop: 15,
    },

    emptyHeart:{
        width: 160,
       height: 30,
    marginLeft:"93%",
    position:"absolute",
   marginTop:"3%",
   padding:5,
   backgroundColor:"bleu"
 
     }
   
  
    
  
   //  comp:{
   //      width: '90%',
   //      height: '90%',
   //      backgroundColor: 'white',
   //      borderRadius: 7,
   //  },
   //  Card:{
   //     width: "90%",
   //     height: "80%",
   //     backgroundColor: 'white',
   //     borderRadius:7,
   //     justifyContent: 'center',
    
    
   //  },
   //  // details:{
   //  // flex:2,
   //  //  backgroundColor: "yellow",
   //  //  paddingTop:"20%",
   //  //  marginTop:"10%"

     
   //  // },
   //  star:{
   //     width: 20,
   //     height: 20,
   //     marginRight: 5
   //  },
   //  column:{
   //     minHeight:20,
   //     flex:1,
   //     flexDirection: "row",
   //     justifyContent:"space-between",
  
    
   //  },
   //  name:{
   //     fontSize: 18,
   //     fontWeight: "bold",
   //     color: "black",
   //     marginLeft:"4%"
   //  },
   //  type:{
   //     fontSize: 14,
   //     color: "rgb(130, 124, 140)",
   //     marginRight:"5%"
    
   //  },
   //  price:{
   //     fontSize: 18,
   //     fontWeight: "bold",
   //     color: "rgb(172, 133, 234)",
   //     marginRight:"5%"
   //  },
   //  review:{
   //     fontSize: 12,
   //     color: "rgb(130, 124, 140)",
   //     paddingTop:"1%",
   //     marginRight:"5%"
     
   //  },
   //  rev:{
   //     flexDirection: "row",
   //     paddingTop:"1%",
   //     marginRight:"5%"
       
     
   //  },
   //  emptyHeart:{
   //     width: 20,
   //     height: 10,
   //   marginLeft:"89%",
   //   paddingTop:"6%",
   //   marginTop:"1%"
   //  },
  })


    export default CardCar