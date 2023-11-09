import React from 'react';
import { View, StyleSheet ,Dimensions} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
const { width, height } = Dimensions.get("screen");
const Stats = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June' ],
    datasets: [
      {
        data: [50, 60, 70, 65, 80, 75],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={width}
        height={350}
        fromZero={true}
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
    flex: 1,
  },
});

export default Stats;
