
import {View,Text,StyleSheet,TouchableOpacity} from "react-native"
import Slider from '@react-native-community/slider'
import { useDispatch ,useSelector} from "react-redux";
import {useState,useEffect} from 'react'
import { getAllCars ,fetchFilteredCars} from "../store/carFetch";
import { useNavigation } from '@react-navigation/native'

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
      <TouchableOpacity    style={[styles.button, isPressed && styles.pressedButton]} onPress={() => handleTypeVehcule("Commercial")} >
      <Text style={styles.buttonText}>Commercial</Text>
       </TouchableOpacity>
       <TouchableOpacity    onPress={() => handleTypeVehcule("Sports")} >
      <Text  style={styles.title1}>Sports</Text>
      </TouchableOpacity>
      <TouchableOpacity   onPress={() => handleTypeVehcule("Luxury")}  >
      <Text  style={styles.title1}>Luxury</Text>
      </TouchableOpacity>
      </View>
       <View style={styles.allTypes}>
      <TouchableOpacity   onPress={() => handleTypeVehcule("Economical")} style ={styles.cardType2}>
      <Text  style={styles.title1}>Economical</Text>
      </TouchableOpacity>
</View>
<Text  style={styles.title}>Vehicle characteristics</Text>

<View style={styles.allTypes}>
      <TouchableOpacity    onPress={() => handleChara("Automatic")}>
      <Text  style={styles.title1}>Automatic</Text>
       </TouchableOpacity>
       <TouchableOpacity  onPress={() => handleChara("Semi-Automatic")}  >
      <Text  style={styles.title1}>Semi-Automatic</Text>
      </TouchableOpacity>
      <TouchableOpacity     onPress={() => handleChara("Manual")}>
      <Text  style={styles.title1}>Manual</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity>
      <Text onPress={() => navigation.navigate("filtredcar")} style={styles.title1}>ShowResults</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  slider:{
    height:50,
    backgroundColor:"yellow",
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
    backgroundColor :"rgb(106,110,197)"
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




});




  export default AdvancedSearch

