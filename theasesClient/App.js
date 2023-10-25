import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
export default function App() {
  const[sta,setSta] = useState(false)
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {sta?<Text>selim </Text>:null}

      <Button
	onPress={() =>setSta(true)}
	title="Press here"
/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
