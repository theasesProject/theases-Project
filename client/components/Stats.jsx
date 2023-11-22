import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import moment from "moment";
const { width, height } = Dimensions.get("screen");
const Stats = () => {
  const [realLineData, setRealLineData] = useState({
    labels: ["...", "...", "...", "...", "...", "..."],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
      },
    ],
  });
  const [realPieDate, setRealPieDate] = useState([]);
  const activeUser = useSelector(selectUser);

  const generateMonthArray = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonthIndex = new Date().getMonth();
    return months.slice(currentMonthIndex - 5, currentMonthIndex + 1);
  };

  const fetchServices = async () => {
    try {
      console.log("reached");
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/booking/allServiceForAgency/${activeUser.id}`
      );

      let months = response.data.map((e) =>
        moment(e.User.createdAt).format("MMM")
      );

      let brands = response.data.map((e) => e.service.brand);

      setRealLineData(rentsPerMonth(months));
      setRealPieDate(topBrands(brands));
    } catch (err) {
      console.error(err);
    }
  };

  const rentsPerMonth = (months) => {
    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonthIndex = new Date().getMonth();
    let acc = {};
    let result = [];
    let latestMonths = allMonths.slice(
      currentMonthIndex - 5,
      currentMonthIndex + 1
    );

    for (let month of months) {
      if (!acc.hasOwnProperty(month)) {
        acc[month] = 1;
      } else {
        acc[month]++;
      }
    }

    console.log("acc: ", acc);

    for (let value of latestMonths) {
      if (acc.hasOwnProperty(value)) {
        result.push(acc[value]);
      }
    }

    while (result.length <= 6) {
      result.unshift(0);
    }

    return {
      labels: generateMonthArray(),
      datasets: [{ data: [...result] }],
    };
  };

  const topBrands = (array) => {
    let counter = {};
    let values = [];
    let colors = ["#C2D9FF", "#8E8FFA", "#7752FE", "#190482", "#000ff"];
    let result;

    for (let value of array) {
      if (!counter.hasOwnProperty(value)) {
        counter[value] = 1;
      } else {
        counter[value]++;
      }
    }

    for (let key in counter) {
      values.push({
        name: key,
        rentCount: counter[key],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      });
    }

    result = Object.values(values)
      .sort((a, b) => b.rentCount - a.rentCount)
      .slice(0, 5);

    for (let brand of result) {
      brand.color = colors[0];
      colors.shift();
    }
    return result;
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const lineData = {
    //dummy data for the line chart
    labels: generateMonthArray(),
    datasets: [
      {
        data: [10, 20, 25, 30, 40, 70],
      },
    ],
  };
  const pieData = [
    // dummy data for the pie chart
    {
      name: "volkswagen",
      rentCount: 215000,
      color: "#C2D9FF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "renault",
      rentCount: 28000,
      color: "#8E8FFA",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "BMW",
      rentCount: 5200,
      color: "#7752FE",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Mercedes",
      rentCount: 85300,
      color: "#190482",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "dacia",
      rentCount: 119200,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <LineChart
          data={realLineData}
          // data={lineData}
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
          data={realPieDate}
          width={width}
          height={height * 0.3}
          accessor="rentCount"
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
