// context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import appConfig from '../appConfig';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logindata, setLoginData] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log('No token found');
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      setLoginData(false);
    } else {
      try {
        const response = await axios.post(`http://${appConfig.PUBLIC_SERVER_IP}:5000/api/users/deconnection`, { token });
        if (response.status === 200) {
          setLoginData(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("userId");
          setLoginData(false);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Internal server error',
          });
          setLoginData(false);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (logindata === false) {
      verifyUser();
    }
  }, [logindata]);

  return (
    <AuthContext.Provider value={{ logindata, setLoginData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
