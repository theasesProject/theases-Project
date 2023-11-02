import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import porche from "../assets/Porsche.png"
import Honda from "../assets/Honda.jpg"
import Hyundai from "../assets/Hyundai.jpg"
import Toyota from "../assets/Toyota.png"
import Ford from "../assets/ford.png"
import {useState} from "react"
import axios from "axios"
import { DOMAIN_NAME } from "../env";
function BrandBar({onPress,onFilterByBrand}){
    const [carByBrand,setCarByBrand]=useState([])
    const [error,setError]=useState(false)
    const handleFilterByBrand= (brandName)=>{

        axios.post(`http://${DOMAIN_NAME}:5000/api/car/byBrand`,{"brand":brandName}).then((response)=>{
          
            onFilterByBrand(response.data)
           
        }).catch(error=>{
            console.log('error',error)
        })
    
        }



return (
    <View    style={styles.brand}>
    <View   style={styles.BrandBar}>
        <View   style={styles.barText}>
    <Text   style={styles.topBrand} >Top Brands</Text>
    <Text    style={styles.ViewAll} >View All</Text>
    </View>
    </View>
    <ScrollView horizontal={true}  
    style={styles.allBrandImage} >
          <View  style={styles.brandDetails} >
        <TouchableOpacity     onPress={()=>handleFilterByBrand("Porche")}>
           <Image style={styles.brandLogo}  source={porche} ></Image>
           <Text   style={styles.brandName} >Porche</Text>
           </TouchableOpacity> 

           </View>
           <View  style={styles.brandDetails} >
           <TouchableOpacity     onPress={()=>handleFilterByBrand("Ford")}>
           <Image style={styles.brandLogo}  source={Ford} ></Image>
           <Text   style={styles.brandName} >Ford</Text>
           </TouchableOpacity>
           </View>
           <View  style={styles.brandDetails} >
           <TouchableOpacity     onPress={()=>handleFilterByBrand("Toyota")}>
           <Image style={styles.brandLogo}  source={Toyota} ></Image>
           <Text   style={styles.brandName} >Toyota</Text>
           </TouchableOpacity>
           </View>
           <View  style={styles.brandDetails} >
           <TouchableOpacity     onPress={()=>handleFilterByBrand("Hyundai")}>
           <Image style={styles.brandLogo}  source={Hyundai} ></Image>
           <Text   style={styles.brandName} >Hyundai</Text>
           </TouchableOpacity>
           </View>
           <View  style={styles.brandDetails} >
           <TouchableOpacity     onPress={()=>handleFilterByBrand("Honda")}>
           <Image style={styles.brandLogo}  source={Honda} ></Image>
           <Text   style={styles.brandName} >Honda</Text>
           </TouchableOpacity>
           </View>
           <View  style={styles.brandDetails} >
           {/* <TouchableOpacity     onPress={()=>handleFilterByBrand("Porche")}>
           <Image style={styles.brandLogo}  source={porche} ></Image>
           <Text   style={styles.brandName} >Porche</Text>
           </TouchableOpacity> */}
           </View> 

        
           </ScrollView> 
    </View>
)



}
const styles = StyleSheet.create({
    brand:{
     
        width:"100%",
        height:140,
        borderRadius:10,
        alignItems:"center"
    },
    BrandBar:{
       
        width:"100%",
        height:40,
        borderRadius:10,
        alignItems:"center"
    
    },
    barText:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
       height:40,
       width:360,
        alignItems:"center",
    
    },
    topBrand:{
        fontWeight: "bold",
        fontSize:20
    },
    ViewAll:{
       color: "grey",
        fontSize:18,
       
    },
    allBrandImage:{
       
        borderRadius:10,
      

    },
    brandLogo:{
       
        width:70,
        height:60,
        borderRadius:60,
        justifyContent:"center",
        alignItems:"center"

    },
    allBrandImage: {
        flex:1,
        flexDirection:"row",
        gap:70,
       

    },
    brandDetails:{
        backgroundColor:"rgb(237, 238, 247)",
    flex:1,
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
    width:90,
    height:80,
    marginLeft:10,
    },
    brandName:{
        justifyContent:"center",
        alignItems:"center",
        paddingLeft:14
    }

})



export default BrandBar;