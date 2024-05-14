// hooks/useAuth.js
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthVerifyContext';
import { useNavigation } from '@react-navigation/native';

const useAuthVerify = () => {
  const { logindata, setLoginData, loading } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading && logindata === false) {
      navigation.navigate("newLogIn");
    }
  }, [logindata, loading, navigation]);

  return { logindata, setLoginData, loading };
};

export default useAuthVerify;
