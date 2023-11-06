import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  succes: null,
  unavailableDate: [],
};
export const CreateBooking = createAsyncThunk(
  "booking/CreateBooking",
  async (params) => {
    try {
      console.log(params, "bbbbb");
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/booking/createbooking`,

        params
      );
      console.log(response.data, "response");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const GetUnavailableDatesForCar = createAsyncThunk(
  "booking/GetUnavailableDatesForCar",
  async (id) => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/booking/unavailabledates/${id}`
      );
      console.log(response.data, "response");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(CreateBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(CreateBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.succes = action.payload;
    });
    builder.addCase(CreateBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(GetUnavailableDatesForCar.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(GetUnavailableDatesForCar.fulfilled, (state, action) => {
      state.loading = false;
      state.unavailableDate = action.payload;
    });
    builder.addCase(GetUnavailableDatesForCar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default bookingSlice.reducer;
