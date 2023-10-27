import { View ,Text,Button} from "react-native";

function Home({ navigation }) {
    return (
     <View>
        <Text>Home</Text>
        <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Userprofile')}
    />
    <Button
      title="Go to Map"
      onPress={() => navigation.navigate('Map')}
    />
     </View>
    );
  }
  
  Home.navigationOptions = {
    title: 'Home',
  };
  export default Home