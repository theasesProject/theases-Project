import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  succes: null,
  unavailableDate: [],
  allServiceByAgency: [],
  avaibleCar: [],
  allServiceUser: [],
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
// export const GetUnavailableTimesForCar = createAsyncThunk(
//   "booking/GetUnavailableTimesForCar",
//   async (id) => {
//     try {
//       const response = await axios.get(
//         `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/booking/unavailableTime/${id}`
//       );

//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
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
export const allServiceForUser = createAsyncThunk(
  "booking/allServiceForUser",
  async (id) => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/booking/allserviceforUser/${id}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deletedServiceByAgency = createAsyncThunk(
  "booking/deletedServiceByAgency",
  async (CarId, id) => {
    try {
      const response = await axios.delete(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/booking/deletedServiceByAgency/${CarId}/${id}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deletedServiceByUser = createAsyncThunk(
  "booking/deletedServiceByUser",
  async (body) => {
    console.log(body, "service");
    const UserId = body.UserId;
    const id = body.id;
    try {
      const response = await axios.delete(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/booking/deletedServiceByUser/${UserId}/${id}`
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
    builder.addCase(allServiceForUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(allServiceForUser.fulfilled, (state, action) => {
      state.loading = false;
      state.allServiceUser = action.payload;
    });
    builder.addCase(allServiceForUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // builder.addCase(GetUnavailableTimesForCar.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(GetUnavailableTimesForCar.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.unavailableTime = action.payload;
    // });
    // builder.addCase(GetUnavailableTimesForCar.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
    builder.addCase(deletedServiceByAgency.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletedServiceByAgency.fulfilled, (state, action) => {
      state.loading = false;
      state.succes = action.payload;
    });
    builder.addCase(deletedServiceByAgency.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deletedServiceByUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletedServiceByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.succes = "succes";
    });
    builder.addCase(deletedServiceByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default bookingSlice.reducer;
