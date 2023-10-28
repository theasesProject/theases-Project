
import { View, Text, StyleSheet, ScrollView,TextInput,TouchableOpacity ,Image} from 'react-native';
import filter from "../assets/filter.png"

function SearchBar(){

return (

<View    style={styles.searchBar}>
<View style={styles.searchDetails}>
<Text style={styles.FirstText}>Select or search your</Text>
<Text style={styles.FirstText}>favourite location</Text>
<View  style={styles.inputAndButton}  >
<TextInput   style={styles.input}   placeholder='Search'></TextInput>
<View  style={styles.filterImage} >
<Image source={filter}  style={styles.filter}></Image>
</View    >

</View>
</View>
</View>

)

}
const styles = StyleSheet.create({

    searchBar:{
        backgroundColor:"rgb(237, 238, 247)",
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
    },
    filterImage:{
        width:50,
        height:50,
        backgroundColor :"rgb(106,119,197)",
        borderRadius:10,
     justifyContent:"center",
        alignItems:"center"
    },
    inputAndButton:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        gap:20
      
    },
    filter:{
        width:20,
        height:20,
    }

})

export default SearchBar