
import { View, Text, StyleSheet, ScrollView,TextInput,TouchableOpacity ,Image} from 'react-native';
import iconfilter from "../assets/car1.jpg"

function SearchBar(){

return (

<View    style={styles.searchBar}>
<View style={styles.searchDetails}>
<Text style={styles.FirstText}>Select or search your</Text>
<Text style={styles.FirstText}>favourite location</Text>
<TextInput   style={styles.input}   placeholder='Search'></TextInput>


</View>
</View>


)




}
const styles = StyleSheet.create({
    // searchBar:{
    //     width:"100%",
    //     height:"6%",
    //     // marginLeft:"5%",
    //    backgroundColor:"red",
    //     borderRadius:8,
    //     alignItems:"center"
    // },
    // firstText:{
    //     marginTop:"2%",
    //     fontWeight: "bold",
    //     fontSize:20
    // },
    // secondText:{
    //     fontWeight: "bold",
    //     fontSize:20,
     
    // },
    // input:{

    //     borderColor:"rgb(130, 124, 140)",
    //     borderWidth:1,
    //     borderRadius:5,
    //     width:"60%",
    //     height:"28%",
    //     marginLeft:"-20%",
    //     marginTop:"8%",
    //     padding:10,
    //     backgroundColor:"blue"
    // },
    // search:{
    //     marginTop:"-15%",
    //     marginLeft:"70%",
    //     borderRadius:10
     
    // }
    searchBar:{
        backgroundColor:"white",
        width:"100%",
        height:150,
        borderRadius:10,
        alignItems:"center"
    },
    input:{
        backgroundColor:"rgb(219, 217, 224)",
        width:180,
        height:50,
        borderRadius:10,

    },
    searchDetails:{
 flex:1,
 flexDirection:"column",
 justifyContent:"space-around",
 alignItems:"center",

    },
    FirstText:{
         fontWeight: "bold",
           fontSize:20
    }
})

export default SearchBar