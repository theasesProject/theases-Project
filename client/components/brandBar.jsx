import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import porche from "../assets/Porsche.png"



function BrandBar(){
    const data = [1,2,3,4,5]
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
           <Image style={styles.brandLogo}  source={porche} ></Image>
           <Text   style={styles.brandName} >porch</Text>
           </View>
           <View  style={styles.brandDetails} >
           <Image style={styles.brandLogo}  source={porche} ></Image>
           <Text   style={styles.brandName} >porch</Text>
           </View>
           <View  style={styles.brandDetails} >
           <Image style={styles.brandLogo}  source={porche} ></Image>
           <Text   style={styles.brandName} >porch</Text>
           </View>
           <View  style={styles.brandDetails} >
           <Image style={styles.brandLogo}  source={porche} ></Image>
           <Text   style={styles.brandName} >porch</Text>
           </View>
           <View  style={styles.brandDetails} >
           <Image style={styles.brandLogo}  source={porche} ></Image>
           <Text   style={styles.brandName} >porch</Text>
           </View>
           <View  style={styles.brandDetails} >
           <Image style={styles.brandLogo}  source={porche} ></Image>
           <Text   style={styles.brandName} >porch</Text>
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
        borderRadius:40,
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
    justifyContent:"space-around",
    alignItems:"center",
    borderRadius:10,
    width:90,
    height:80,
    marginLeft:10,
    }

})



export default BrandBar;