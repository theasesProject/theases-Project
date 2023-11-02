import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, ViewBase , StyleSheet } from "react-native";
import { Text } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import CardCar from "../components/CardCar.jsx";

function Favorites() {
  const [all, setAll] = useState([]);
  const { DOMAIN_NAME } = require("../env.js");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const fetch = async function () {
    const patched = await axios.get(
      `http://${DOMAIN_NAME}:5000/api/bookmarks/getAll/${user.data.id}`
    ).then(response => {
      setAll(response.data)
      console.log(response.data)
    })
  };
  useEffect(() => {
    console.log(user.data);
    fetch();
    console.log(all)
  }, []);

  return <View style={styles.container}>
    {all.map(car => {
      <CardCar oneCar={car}/>
    })}
  </View>;
}
const styles = StyleSheet.create({
  container:{
    display : 'flex',
    flexDirection: 'column',
    gap:3,
  }
})

export default Favorites;