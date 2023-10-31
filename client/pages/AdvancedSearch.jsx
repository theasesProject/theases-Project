
import {View,Text,StyleSheet,TouchableOpacity} from "react-native"
import Slider from '@react-native-community/slider'
import { useDispatch ,useSelector} from "react-redux";
import {useState,useEffect} from 'react'
import { getAllCars ,fetchFilteredCars} from "../store/carFetch";
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from "expo-linear-gradient";

function AdvancedSearch() {
  const navigation = useNavigation()
  const allCars = useSelector((state) => state.car.allCars);
  
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderValue2, setSliderValue2] = useState(0)
  const [priceSearched, setPriceSearched] = useState(0)
  const [typeVehicule, setTypeVehicule] = useState("")
  const [chara, setChar] = useState("")
  const [isPressed, setIsPressed] = useState(false)
  
  const dispatch = useDispatch();
  useEffect(() => {
    const filterCriteria = {
      "price":[sliderValue],
      "typevehicle":typeVehicule,
      "characteristics":chara}

  
    dispatch(getAllCars());
    dispatch(fetchFilteredCars(filterCriteria))
    prices()
  }, [dispatch]);







  const handleSliderChange = (value) => {
    setPriceSearched(value);
  };

  const handleButtonPress = (value) => {
    setPriceSearched(value);
  };

  const handleTypeVehcule = (value) => {
    setTypeVehicule(value);
    setIsPressed(true)
  };
  const handleChara = (value) => {
    setChar(value);
    setIsPressed(!isPressed)
  
    
  };
 
  console.log(allCars,sliderValue,sliderValue,"allcars")
const prices=()=>{
  let minPrice = allCars[0].price
  let maxPrice = allCars[0].price
for (const car of allCars) {
  const price = car.price;
  if (price < minPrice) {
    setSliderValue(price);
  }
  if (price > maxPrice) {
    setSliderValue2(price);
  }
}}

  return (
    <View>
      <Text  style={styles.title}>All Cars</Text>
      <TouchableOpacity  style={styles.buttonStart} onPress={() => handleButtonPress(sliderValue)}>
       <Text>{priceSearched}</Text>
      </TouchableOpacity   >
      <Slider style={styles.slider}
        step={10}
        onValueChange={handleSliderChange}
        minimumValue={sliderValue}
        maximumValue={sliderValue2}
      />
      {/* <TouchableOpacity onPress={() => handleButtonPress(maxPrice)}>
   
      </TouchableOpacity> */}
      <Text  style={styles.title}>Types</Text>
      <View style={styles.allTypes}>
      
      <TouchableOpacity onPress={()=>handleTypeVehcule("Commercial")}>
           
            <LinearGradient
              colors={["#6C77BF", "#4485C5"]}
              locations={[0, 1]}
              style={styles.buttonContainer}
            >
              <Text>Commercial</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleTypeVehcule("Sports")}>
           
           <LinearGradient
             colors={["#6C77BF", "#4485C5"]}
             locations={[0, 1]}
             style={styles.buttonContainer}
           >
             <Text>Sports</Text>
           </LinearGradient>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>handleTypeVehcule("Luxury")}>
           
           <LinearGradient
             colors={["#6C77BF", "#4485C5"]}
             locations={[0, 1]}
             style={styles.buttonContainer}
           >
             <Text>Luxury</Text>
           </LinearGradient>
         </TouchableOpacity>
     
      </View>
       <View style={styles.allTypes}>
       <TouchableOpacity onPress={()=>handleTypeVehcule("Economical")}>
           
           <LinearGradient
             colors={["#6C77BF", "#4485C5"]}
             locations={[0, 1]}
             style={styles.buttonContainer}
           >
             <Text>Economical</Text>
           </LinearGradient>
         </TouchableOpacity>
 
</View>
<Text  style={styles.title}>Vehicle characteristics</Text>

<View style={styles.allTypes}>
<TouchableOpacity onPress={()=>handleTypeVehcule("Automatic")}>
           
           <LinearGradient
             colors={["#6C77BF", "#4485C5"]}
             locations={[0, 1]}
             style={styles.buttonContainer}
           >
             <Text>Automatic</Text>
           </LinearGradient>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>handleTypeVehcule("Semi-Automatic")}>
           
           <LinearGradient
             colors={["#6C77BF", "#4485C5"]}
             locations={[0, 1]}
             style={styles.buttonContainer}
           >
             <Text>Semi-Automatic</Text>
           </LinearGradient>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>handleTypeVehcule("Manual")}>
           
           <LinearGradient
             colors={["#6C77BF", "#4485C5"]}
             locations={[0, 1]}
             style={styles.buttonContainer}
           >
             <Text>Manual</Text>
           </LinearGradient>
         </TouchableOpacity>
      </View>

       <TouchableOpacity onPress={() => navigation.navigate("FiltredCar")}>
           
           <LinearGradient
             colors={["#6C77BF", "#4485C5"]}
             locations={[0, 1]}
             style={styles.buttonContainer}
           >
             <Text>ShowResults</Text>
           </LinearGradient>
         </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  slider:{
    height:50,
    width:390

  },
  title:{
    fontWeight: "bold",
        fontSize:20,
      
  },

  title1:{
    fontSize:20,
    color:"black",
    backgroundColor :"rgb(106,110,197)",
    borderRadius:7,
   width:150,
     height :50,
     textAlign:"center"
  },
  allTypes:{
    
    flexDirection:"row",

    justifyContent:"flex-start",
    alignItem:"flex-start", 
    gap: 22,

    padding:10

    
  },
  cardType2:{
  gap:15,

  },
  buttonStart:{
    // backgroundColor :"rgb(106,110,197)"
  },
  button: {
    backgroundColor: 'blue', // Initial background color
    padding: 10,
    borderRadius: 5,
  },
  pressedButton: {
    backgroundColor: 'red', // Background color when pressed
  },
  buttonText: {
    color: 'white',
  },
  buttonContainer: {
    // backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginVertical: 15,
    width: 100,
  },




});




  export default AdvancedSearch

