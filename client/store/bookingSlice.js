import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  succes: null,
};
export const CreateBooking = createAsyncThunk(
  "booking/CreateBooking",
  async (destination, start, end, UserId, CarId) => {
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/booking/addBooking`,
        {
          destination: destination,
          startDate: start,
          endDate: end,
          UserId: UserId,
          CarId: CarId,
        }
      );

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
  },
});

export default bookingSlice.reducer;
