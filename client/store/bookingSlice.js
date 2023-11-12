import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  succes: null,
  unavailableDate: [],
  allServiceByAgency: [],
  avaibleCar: [],
};
export const CreateBooking = createAsyncThunk(
  "booking/CreateBooking",
  async (params) => {
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/booking/createbooking`,

        params
      );
      console.log(response.data, "booking");
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

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const UpdateServiceByAgency = createAsyncThunk(
  "booking/UpdateServiceByAgency",
  async (params) => {
    try {
      const response = await axios.put(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/booking/updatebooking`,
        params
      );
      console.log(response.data, "params");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const allServiceForAgency = createAsyncThunk(
  "booking/allServiceForAgency",
  async (id) => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/booking/allServiceForAgency/${id}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAllCarByDate = createAsyncThunk(
  "booking/getAllCarByDate",
  async (body) => {
    try {
      console.log(body, "body");
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/booking/avaibleCar`,
        body
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
    builder.addCase(allServiceForAgency.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(allServiceForAgency.fulfilled, (state, action) => {
      state.loading = false;
      state.allServiceByAgency = action.payload;
    });
    builder.addCase(allServiceForAgency.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(UpdateServiceByAgency.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(UpdateServiceByAgency.fulfilled, (state, action) => {
      state.loading = false;
      state.succes = action.payload;
    });
    builder.addCase(UpdateServiceByAgency.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllCarByDate.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllCarByDate.fulfilled, (state, action) => {
      state.loading = false;
      state.avaibleCar = action.payload;
    });
    builder.addCase(getAllCarByDate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default bookingSlice.reducer;
