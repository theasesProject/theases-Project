import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  succes: null,
};
export const CreateAgency = createAsyncThunk(
  "agency/CreateAgency",
  async (params) => {
    if (!params) return;
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/request/create/${params.id}`,
        params.body
      );
      const requestId = response.data.id;
      await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/media/add/request/${requestId}`,
        params.media
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const agencySlice = createSlice({
  name: "agency",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(CreateAgency.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(CreateAgency.fulfilled, (state, action) => {
      state.loading = false;
      state.succes = action.payload;
    });
    builder.addCase(CreateAgency.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default agencySlice.reducer;
