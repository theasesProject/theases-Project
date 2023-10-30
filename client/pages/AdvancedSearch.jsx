
import {View,Text,StyleSheet,TouchableOpacity} from "react-native"
import RangeSlider from 'rn-range-slider'
import Slider from '@react-native-community/slider'
import { useDispatch ,useSelector} from "react-redux";
import {useState,useEffect} from 'react'
import { getAllCars ,fetchFilteredCars} from "../store/carFetch";
import { useNavigation } from '@react-navigation/native'
function AdvancedSearch() {
  const navigation = useNavigation()
  const allCars = useSelector((state) => state.car.allCars);
  
  const [sliderValue, setSliderValue] = useState(minPrice);
  const [sliderValue2, setSliderValue2] = useState(maxPrice)
  const [typeVehicule, setTypeVehicule] = useState("")
  const [chara, setChar] = useState("")

  
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
    setSliderValue(value);
  };

  const handleButtonPress = (value) => {
    setSliderValue(value);
  };

  const handleTypeVehcule = (value) => {
    setTypeVehicule(value);
  };
  const handleChara = (value) => {
    setChar(value);
  };
  let minPrice = allCars[0].price;
  let maxPrice = allCars[0].price
const prices=()=>{
for (const car of allCars) {
  const price = car.price;
  if (price < minPrice) {
    minPrice = price;
  }
  if (price > maxPrice) {
    maxPrice = price;
  }
}}

  return (
    <View>
      <Text  style={styles.title}>All Cars</Text>
      <TouchableOpacity  style={styles.buttonStart} onPress={() => handleButtonPress(minPrice)}>
       <Text>{sliderValue}</Text>
      </TouchableOpacity   >
      <Slider style={styles.slider}
        step={10}
        onValueChange={handleSliderChange}
        minimumValue={minPrice}
        maximumValue={maxPrice}
      />
      {/* <TouchableOpacity onPress={() => handleButtonPress(maxPrice)}>
   
      </TouchableOpacity> */}
      <Text  style={styles.title}>Types</Text>
      <View style={styles.allTypes}>
      <TouchableOpacity    onPress={() => handleTypeVehcule("Commercial")} >
      <Text  style={styles.title1}>Commercial</Text>
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
      <TouchableOpacity onPress={() => navigation.navigate("filtredcar")}>
      <Text  style={styles.title1}>ShowResults</Text>
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
   width:112,
     height :40,
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
  }




});




  export default AdvancedSearch

