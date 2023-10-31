// import React, { Component } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import Spinner from 'react-native-loading-spinner-overlay'; // Import the Spinner component

// class LoadingScreen extends Component {
//   constructor() {
//     super();
//     this.state = {
//       isLoading: false,
//     };
//   }

//   // Function to start the loading animation
//   startLoading = () => {
//     this.setState({ isLoading: true });
    
//     // Simulate loading for 3 seconds (You can replace this with actual API calls)
//     setTimeout(() => {
//       this.setState({ isLoading: false });
//     }, 3000);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>Welcome to Loading Animation Page</Text>
//         <Button title="Start Loading" onPress={this.startLoading} />
//         <Spinner        
//           visible={this.state.isLoading}
//           textContent={'Loading...'}
//           textStyle={styles.spinnerText}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   spinnerText: {
//     color: '#fff',
//   },
// });

// export default LoadingScreen;
