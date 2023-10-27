import { useEffect, useState } from 'react';
import { View, StyleSheet ,Text} from 'react-native';
import { WebView } from 'react-native-webview';
// import * as Location from 'expo-location';

export default function GoogleMapsComponent() {
    // const [location, setLocation] = useState(null);
    // (async () => {
    //     const { status } = await Location.requestForegroundPermissionsAsync();
  
    //     if (status !== 'granted') {
    //       console.log('Permission to access location was denied');
    //       return;
    //     }
  
    //     const location = await Location.getCurrentPositionAsync({});
    //     setLocation(location);
    //   })();
    useEffect(() => {
       
      }, []);
    return (<View>

      <View style={styles.container}>
        <WebView 
          source={{ html: '<iframe src="https://maps.google.com/maps?q=Tangesir%20Dates%20Products&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>' }}
        
        />
      </View>
      {/* <View>
      {location ? (
        <Text>
          Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
        </Text>
      ) : (
        <Text>Loading location...</Text>
      )}
    </View> */}
      </View>
      );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  