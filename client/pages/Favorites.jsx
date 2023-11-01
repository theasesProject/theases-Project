import axios from "axios";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";

function Favorites() {
  const [all, setAll] = useState([]);
  const { DOMAIN_NAME } = require("../env.js");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const fetch = async function () {
    const patched = await axios.get(
      `http://${DOMAIN_NAME}:5000/api/bookmarks/getAll`,
      {UserId:user.id}
    ).then(response => setAll(response.data))
  };
  useEffect(() => {
    fetch();
    console.log(all);
  }, []);

  return <View>
    <Text>hi</Text>
  </View>;
}

export default Favorites;
