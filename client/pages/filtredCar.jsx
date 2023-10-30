
import {View,Text} from "react-native"
import CardCar from '../components/CardCar.jsx'
import { useDispatch ,useSelector} from "react-redux";



function FiltredCar(){
    const filteredCars = useSelector((state) => state.car.carFiltred)

return (

<View   style={styles.homePage}>
    
 <ScrollView>
       {filteredCars.map((element, i) => ( 
       <View style={styles.all}>
         <CardCar key={i} oneCar={element} />
          </View>
         ))}
    </ScrollView>

</View>


)
}
const styles = StyleSheet.create({
    homePage: {
      marginTop: "10%",
      flex: 1,
      backgroundColor: "rgb(219, 217, 224)",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    all: {
      paddingBottom: 20,
    },
  });
  

export default FiltredCar