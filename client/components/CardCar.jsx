import { View ,Text, StyleSheet,Image,TouchableOpacity} from "react-native";
import {useState} from "react"
import car from "../assets/car2.png"
import emptyStar from "../assets/etoile.png"
import star from "../assets/star.jpg"
import heartBleu from "../assets/filledPurpleHeart.png"
import emptyHeart from "../assets/emptyHeart.png"
function CardCar({onPress}) {
   const [starSelected, setStarSelected] = useState(false)
   const [heartSelected, setHeartSelected] = useState(false)
   const starImage=starSelected ? star :emptyStar;
   const heartImage=heartSelected? heartBleu : emptyHeart;
const handleStarPress = () => {
          setStarSelected(!starSelected);
          console.log("etoile")
       };
   const handleHeartPress =()=>{
      setHeartSelected(!heartSelected)
      console.log("etoile")
   }
 



   
    return (
      <View style={styles.card}>
        
        <View   style={styles.barText}>
    <Text   style={styles.AllCars} >All Cars</Text>
    <Text    style={styles.ViewAll} >View All</Text>
    </View>
    <View style={styles.Image}>
    <Image style={styles.carImage}  source={car} ></Image>
    <TouchableOpacity   onPress={ handleHeartPress}>
    <Image style={styles.heart}   source={heartImage} ></Image>
    </TouchableOpacity>
    </View>
    <View style={styles.carDetails}>
    <View   style={styles.NameAvaib}>
    <Text style={styles.carName}>Maserti  976</Text>
    <Text style={styles.avaible}>Avaibility</Text>
    </View>
    <View    style={styles.PriceStar} >
   <View   style={styles.reviews} >
    <TouchableOpacity  onPress={ handleStarPress} >
    <Image    style={styles.heart}  source={starImage} ></Image>
    </TouchableOpacity>
    <Text style={styles.avaible}>(150 review)</Text>
    </View>
    <Text style={styles.carPrice}>$540/day</Text>
   
    </View>
    </View>
    </View>
    )
    }



const styles = StyleSheet.create({
  card:{
    backgroundColor:"white",
    width:"100%",
    height:250,
    borderRadius:10,
    alignItems:"center"

  },
  barText:{
    width:360,
    height:35,
    borderRadius:10,
flexDirection:"row",
justifyContent:"space-between"
},
AllCars:{
    fontWeight: "bold",
    fontSize:20
},
ViewAll:{
   color: "grey",
    fontSize:18,
   
},
carImage:{

    width:300,
    height:150,
},
heart:{
  
  width:30,
  height:28,

},
Image:{
  flexDirection:"row",
  justifyContent:"space-around",
  alignItems:"flex-start",
gap:10,
  height:150,


},
NameAvaib:{
  flexDirection:"row",
  justifyContent:"space-between",
  gap:180,

},
PriceStar:{
  flexDirection:"row",
  justifyContent:"space-between",
 
},
reviews:{
  flexDirection:"row",
  justifyContent:"space-around",
  alignItems:"center",
  gap:10,
},
carName:{
       fontSize: 18,
       fontWeight: "bold",
       color: "black",
   
    },
    avaible:{
    fontSize: 14,
  color: "rgb(130, 124, 140)",
    },
    carPrice:{
      fontSize: 18,
       fontWeight: "bold",
          color: "rgb(172, 133, 234)"
    }


  })


    export default CardCar