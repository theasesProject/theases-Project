import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN_NAME } from "../env";

const initialState = {
  allCars: [],
  loading: false,
  error: null,
};

export const getAllCars = createAsyncThunk("car/getAllCars", async () => {
  try {
    const response = await axios.get(`http://${DOMAIN_NAME}:5000/api/car/allCars`);
    console.log(response.data,"data")
    return response.data;
  } catch (error) {
    throw error
  }
});


const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    logoutCar: (state) => {
      state.loading = false;
      state.error = null; 
      state.allCars = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCars.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllCars.fulfilled, (state, action) => {
      state.loading = false;
      state.allCars = action.payload;
    });
    builder.addCase(getAllCars.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; 
    });
  },
});

export const { logoutCar } = carSlice.actions;
export default carSlice.reducer;