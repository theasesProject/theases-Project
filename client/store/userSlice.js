import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN_NAME } from "../env";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define an initial state for the user slice
const initialState = {
  data: null,
  loggedIn: false,
  status: "idle", // Possible values: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Define an async thunk to fetch a user from the database
const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
  try {
    // Replace this with your actual API call to fetch the user
    const response = await axios.post(
      `http://${DOMAIN_NAME}:5000/api/users/token`,
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

export const SignUpClick = createAsyncThunk("user/SignUps", async (inputForm, thunkAPI) => {
  try {
    console.log(inputForm);
    const task = await axios.post(`http://${DOMAIN_NAME}:5000/api/users/SignUpUser`, inputForm)
    const response = await axios.post(
      `http://${DOMAIN_NAME}:5000/api/users/emailLogin`,
      {
        email: inputForm.email,
        password: inputForm.password,
      }
    );
    thunkAPI.dispatch(fetchUser(response.data));

    // Store the token in AsyncStorage
    try {
      await AsyncStorage.setItem('UserToken', response.data);
    } catch (e) {
      console.error(JSON.stringify(e));
    }
    
    return task.data
  } catch (er) {
    console.error("error coming from sign function", er);
  }
})


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
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.user.data;
export const logStatus = (state) => state.user.loggedIn;
export { fetchUser };
export const { logoutUser, setUser } = userSlice.actions;
