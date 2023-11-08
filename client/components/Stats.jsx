import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
const Stats = () => {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May','June','July'],
      datasets: [
        {
          data: [50, 60, 70, 65, 80,75,90],
        },
      ],
    };
  
    return (
      <View style={styles.container}>
        <LineChart
          data={data}
          width={300}
          height={250}
          yAxisSuffix="%"
          chartConfig={{
            backgroundGradientFrom: 'lightgray',
            backgroundGradientTo: 'white',
            color: (opacity = 1) => `rgba(68, 133, 197, ${opacity})`,
            decimalPlaces: 2,
          }}
        />
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    //   display: 'flex',
    //   justifyContent: 'center',
    flex:1,
    },
  });
  export default Stats