import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
const { width, height } = Dimensions.get("screen");
import FiraMonoBold from "../assets/fonts/FiraMono-Bold.ttf";
import FiraMonoMedium from "../assets/fonts/FiraMono-Medium.ttf";
import * as Font from "expo-font";
const Stats = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
    datasets: [
      {
        data: [50, 60, 70, 65, 80, 75],
      },
    ],
  };
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "FiraMono-Bold": FiraMonoBold,
        "FiraMono-Medium": FiraMonoMedium,
      });
    };

    loadFonts();
  }, []);
  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={width}
        height={350}
        fromZero={true}
        yAxisSuffix="%"
        chartConfig={{
          backgroundGradientFrom: "lightgray",
          backgroundGradientTo: "white",
          color: (opacity = 1) => `rgba(68, 133, 197, ${opacity})`,
          decimalPlaces: 2,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
});

export default Stats;
