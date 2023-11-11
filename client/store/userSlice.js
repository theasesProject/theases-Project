import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { process.env.EXPO_PUBLIC_SERVER_IP } from "../env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  data: {},
  loggedIn: false,
  status: "idle",
  error: null,
};
console.log("hi");

const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/token`,
      {
        token: token,
      }
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
});

// import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignUpClick = createAsyncThunk(
  "user/SignUps",
  async (inputForm, thunkAPI) => {
    try {
      console.log(inputForm);
      const task = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/SignUpUser`,
        inputForm
      );
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/users/emailLogin`,
        {
          email: inputForm.email,
          password: inputForm.password,
        }
      );
      thunkAPI.dispatch(fetchUser(response.data));

      // Store the token in AsyncStorage
      try {
        await AsyncStorage.setItem("UserToken", response.data);
      } catch (e) {
        console.error(JSON.stringify(e));
      }

      return task.data;
    } catch (er) {
      console.error("error coming from sign function", JSON.stringify(er));
    }
  }
);
export const logUserOut = createAsyncThunk("user/logout", async () => {
  try {
    await AsyncStorage.removeItem("UserToken");
    console.log("UserToken removed");
  } catch (e) {
    console.error("error coming from home", e);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Add a logout action that resets the user state
    logoutUser: (state) => {
      state.status = "idle";
      state.data = null;
      state.loggedIn = false;
      state.error = null;
    },
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.loggedIn = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder.addCase(logUserOut.fulfilled, (state) => {
      state.loggedIn = false;
    });
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.user.data;
export const logStatus = (state) => state.user.loggedIn;
export { fetchUser };
export const { logoutUser, setUser } = userSlice.actions;
