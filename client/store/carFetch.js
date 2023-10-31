import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN_NAME } from "../env";

const initialState = {
  allCars: [],
  carFiltred:[],
  loading: false,
  error: null,
};

export const getAllCars = createAsyncThunk("car/getAllCars", async () => {
  try {
    const response = await axios.get(`http://${DOMAIN_NAME}:5000/api/car/allCars`);
   
    return response.data;
  } catch (error) {
  console.log(error)
  }
});

export const fetchFilteredCars = createAsyncThunk(
  "car/fetchFilteredCars",
  async (filterCriteria, { getState, dispatch }) => {
    try {
      const response = await axios.post(
        `http://${DOMAIN_NAME}:5000/api/car/filtredCar`,
        filterCriteria
      );
      console.log(filterCriteria,"aaa")
      console.log(response.data,"filteredCars")
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const carSlice = createSlice({
  
  name: "car",
  initialState,
  reducers: {},
  
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
 
 
    builder.addCase(fetchFilteredCars.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFilteredCars.fulfilled, (state, action) => {
      state.loading = false;
      state.filteredCars = action.payload; // Set filtered cars in the state
    });
    builder.addCase(fetchFilteredCars.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export default carSlice.reducer;

