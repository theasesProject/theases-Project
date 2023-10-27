
import { View, Text, StyleSheet, ScrollView,TextInput,TouchableOpacity ,Image} from 'react-native';
import iconfilter from "../assets/iconfilter.png"

function SearchBar(){

return (

<View    style={styles.searchBar}>

  <Text  style={styles.firstText}>Select or search Your </Text>
  <Text style={styles.secondText}>favourite vehicle </Text>
  <TextInput
        style={styles.input}
        placeholder="Search"
        // onChangeText={(newText) => setText(newText)}
        // value={text}
      />
      <TouchableOpacity style={styles.avatar}>
   <Image source={iconfilter} style={styles.search} />
     </TouchableOpacity>
</View>


)




}
const styles = StyleSheet.create({
    searchBar:{
        width:"100%",
        height:"6%",
        // marginLeft:"5%",
       backgroundColor:"white",
        borderRadius:8,
        alignItems:"center"
    },
    firstText:{
        marginTop:"2%",
        fontWeight: "bold",
        fontSize:20
    },
    secondText:{
        fontWeight: "bold",
        fontSize:20,
     
    },
    input:{

        borderColor:"rgb(130, 124, 140)",
        borderWidth:1,
        borderRadius:5,
        width:"60%",
        height:"28%",
        marginLeft:"-20%",
        marginTop:"8%",
        padding:10
    },
    search:{
        marginTop:"-15%",
        marginLeft:"70%",
        borderRadius:10
     
    }
})


export default SearchBar