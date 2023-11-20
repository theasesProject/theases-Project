import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
const { width, height } = Dimensions.get("screen");
const Stats = () => {
  const [realLineData, setRealLineData] = useState([]);
  const activeUser = useSelector(selectUser);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/booking/allServiceForAgency/${activeUser.id}`
      );
      console.log("services data: ", response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
    datasets: [
      {
        data: [10, 20, 25, 30, 40, 70],
      },
    ],
  };
  const pieData = [
    {
      name: "volkswagen",
      rented: 215000,
      color: "rgba(101, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "renault",
      rented: 28000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "BMW",
      rented: 5200,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Mercedes",
      rented: 85300,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "dacia",
      rented: 119200,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <LineChart
          data={lineData}
          width={width * 1.15}
          height={height * 0.4}
          fromZero={true}
          backgroundColor={"transparent"}
          chartConfig={{
            backgroundGradientFrom: "#F2F2F2",
            backgroundGradientTo: "#F2F2F2",
            color: (opacity = 1) => `rgba(68, 133, 197, ${opacity})`,
            decimalPlaces: 0,
          }}
        />
      </View>
      <View>
        <PieChart
          data={pieData}
          width={width}
          height={height * 0.3}
          accessor="rented"
          backgroundColor={"transparent"}
          center={[10, 0]}
          chartConfig={{
            color: (opacity = 1) => `rgba(68, 133, 197, ${opacity})`,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default Stats;
