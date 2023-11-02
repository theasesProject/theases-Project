import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN_NAME } from "../env.js";

const initialState = {
  loading: false,
  error: null,
  succes: null,
};
export const CreateAgency = createAsyncThunk(
  "car/CreateAgency",
  async (body) => {
    try {
      const response = await axios.get(
        `http://${DOMAIN_NAME}:5000/api/agency/addAgency`,
        body
      );
      console.log(body, "body");
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
