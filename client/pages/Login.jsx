import { View ,Text} from "react-native";

function Login({ navigation }) {
    return (
     <View>
        <Text>hi</Text>
        <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Home')}
    />
     </View>
    );
  }
  
  Login.navigationOptions = {
    title: 'Login',
  };
  export default Login