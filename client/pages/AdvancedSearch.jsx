
import {View,Text,StyleSheet,TouchableOpacity,Image} from "react-native"
import Slider from '@react-native-community/slider'
import { useDispatch ,useSelector} from "react-redux";
import {useState,useEffect} from 'react'
import { getAllCars ,fetchFilteredCars} from "../store/carFetch";
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from "expo-linear-gradient";
import back from "../assets/back.png"
function AdvancedSearch() {
  const navigation = useNavigation()
  const allCars = useSelector((state) => state.car.allCars);
  
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderValue2, setSliderValue2] = useState(0)
  const [priceSearched, setPriceSearched] = useState(0)
  const [typeVehicule, setTypeVehicule] = useState("")
  const [chara, setChar] = useState("")
  const [isPressed, setIsPressed] = useState(false)
  const [isPressed1, setIsPressed1] = useState(false)
  const [isPressed2, setIsPressed2] = useState(false)
  const [isPressed3, setIsPressed3] = useState(false)
  const [isPressed4, setIsPressed4] = useState(false)
  const [isPressed5, setIsPressed5] = useState(false)
  const [isPressed6, setIsPressed6] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    const filterCriteria = {
      "price":[sliderValue,priceSearched],
      "typevehicle":typeVehicule,
      "characteristics":chara}

  
    dispatch(getAllCars());
    dispatch(fetchFilteredCars(filterCriteria))
    prices()
  }, [dispatch]);


  console.log(chara,"char")
console.log(priceSearched,"price")
console.log(typeVehicule,"typeVehicule")
  const handleTypeVehcule = (value) => {
    setTypeVehicule(value);
    setIsPressed(!isPressed)
  
  };
  const handleTypeVehcule1 = (value) => {
    setTypeVehicule(value);
    setIsPressed1(!isPressed1)
  
  };
  const handleTypeVehcule2= (value) => {
    setTypeVehicule(value);
    setIsPressed2(!isPressed2)
  
  };
  const handleTypeVehcule3 = (value) => {
    setTypeVehicule(value);
    setIsPressed3(!isPressed3)
  
  };
  const handleChara1 = (value) => {
    setChar(value);
    setIsPressed4(!isPressed4)
  
    
  };
  const handleChara2 = (value) => {
    setChar(value);
    setIsPressed5(!isPressed5)
  
    
  };
  const handleChara3= (value) => {
    setChar(value);
    setIsPressed6(!isPressed6)
  
    
  };



  const handleSliderChange = (value) => {
    setPriceSearched(value);
  };

  const handleButtonPress = (value) => {
    setPriceSearched(value);
  };

 
  const handleChara = (value) => {
    setChar(value);
    setIsPressed(!isPressed)
    
  
    
  };
 
 
const prices=()=>{
  let minPrice = allCars.length!==0?allCars[0].price:50
  let maxPrice = allCars.length!==0?allCars[0].price:50
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
    <View  style={styles.homePage}>
      <TouchableOpacity    onPress={()=>{navigation.navigate("Home")}}>
        <Image     style={styles.backImage} source={back}></Image>
      </TouchableOpacity>
      <View  style={styles.allTitles}>
      <Text  style={styles.title}>All Cars</Text>
      </View>
    
      <Slider 
       style={{ width: 400, height: 50}}
       minimumValue={sliderValue}
      maximumValue={sliderValue2}
        onValueChange={handleSliderChange}
       minimumTrackTintColor="blue" 
       maximumTrackTintColor=  "blue"
       thumbTintColor="blue"
       trackWidth="100%"
       thumbWidth="200%"
         
       step={10}
    
      />
        <TouchableOpacity  style={styles.buttonStart} onPress={() => handleButtonPress(sliderValue)}>
       <Text>{priceSearched}$</Text>
      </TouchableOpacity   >
    
       <View  style={styles.allTitles}>
      <Text  style={styles.title}>Types</Text>
      </View>
      <View style={styles.allTypes}>
      
      <TouchableOpacity onPress={()=>handleTypeVehcule("Commercial")}>
           
            <LinearGradient
               colors={isPressed ? ["#6C77BF", "#FFFF"]:["#6C77BF", "#4485C5"]}
              locations={[0, 1]}
              style={styles.buttonContainer}
            >
              <Text>Commercial</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleTypeVehcule1("Sports")}>
           
           <LinearGradient
              colors={isPressed1 ? ["#6C77BF", "#FFFF"]:["#6C77BF", "#4485C5"]}
             locations={[0, 1]}
             style={styles.buttonContainer}
           >
             <Text>Sports</Text>
           </LinearGradient>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>handleTypeVehcule2("Luxury")}>
           
           <LinearGradient
     colors={isPressed2 ?["#6C77BF", "#FFFF"]:["#6C77BF", "#4485C5"]}
             locations={[0, 1]}
             style={styles.buttonContainer}
           >
             <Text>Luxury</Text>
           </LinearGradient>
         </TouchableOpacity>
     
      </View>
       <View style={styles.allTypes}>
       <TouchableOpacity onPress={()=>handleTypeVehcule3("Economical")}>
           
           <LinearGradient
             colors={isPressed3 ?["#6C77BF", "#FFFF"]:["#6C77BF", "#4485C5"]}
             locations={[0, 1]}
             style={styles.buttonContainer}
           >
             <Text>Economical</Text>
           </LinearGradient>
         </TouchableOpacity>
 
</View>
<View  style={styles.allTitles}>
      <Text  style={styles.title}>Characteristics</Text>
      </View>

<View style={styles.allTypes}>
<TouchableOpacity onPress={()=>handleChara1("Automatic")}>
           
           <LinearGradient
            colors={isPressed4 ? ["#6C77BF", "#FFFF"]:["#6C77BF", "#4485C5"]}
             locations={[0, 1]}
             style={styles.buttonContainer}
           >
             <Text>Automatic</Text>
           </LinearGradient>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>handleChara2("Semi-Automatic")}>
           
           <LinearGradient
             colors={isPressed5 ? ["#6C77BF", "#FFFF"]:["#6C77BF", "#4485C5"]}
             locations={[0, 1]}
             style={styles.buttonContainer}
           >
             <Text>SemiAutomatic</Text>
           </LinearGradient>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>handleChara3("Manual")}>
           
           <LinearGradient
             colors={isPressed6 ?  ["#6C77BF", "#FFFF"]:["#6C77BF", "#4485C5"] }
             locations={[0, 1]}
             style={styles.buttonContainer}
           >
             <Text>Manual</Text>
           </LinearGradient>
         </TouchableOpacity>
      </View>

       <TouchableOpacity   style={styles.showResult} onPress={() => navigation.navigate("filtredCar")}>
           
           <LinearGradient
             colors={["#6C77BF", "#4485C5"]}
             locations={[0, 1]}

           >
             <Text  style={styles.showResults}  >Show Results</Text>
           </LinearGradient>
         </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  slider: {
    width: 200,
    height: 40,
    backgroundColor: 'lightgray',
  },
  thumb: {
    backgroundColor: 'blue', // Set the thumb color
  },
  track: {
    backgroundColor: 'green', // Set the track color
  },
  title:{
    fontWeight: "bold",
        fontSize:20,   
  },
  allTitles:{
flexDirection:"column",
justifyContent:"flex-start",
alignItems:"flex-start"

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

  buttonContainer: {
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginVertical: 15,
    width: 117,
color:"white"
  },
  homePage: {
    marginTop: "10%",
    flex: 1,
    backgroundColor: "rgb(219, 217, 224)",
    gap: 5,
  },
  showResult:{
    borderRadius: 10,
    padding: 7,
    alignItems: "center",
    marginVertical: 50,
    width: 380,
    

  },
  showResults:{
    borderRadius: 15,
  textAlign:"center",
  width:440,
  justifyContent:"center",
color:"black",
  fontSize:30,
  height:60,


  },
  backImage:{
    width:22,
    height:20,
   
  }




});




  export default AdvancedSearch

