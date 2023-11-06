import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allUsers: [],
  loading: false,
  error: null,
  oneUser: {},
};
export const updateStateBlock = createAsyncThunk(
  "user/updateStateBlock",
  async (id) => {
    try {
      console.log(id, "id");
      const response = await axios.put(
        `http://localhost:5000/api/admin/update/${id}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/admin/allUsers`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.allUsers = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateStateBlock.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateStateBlock.fulfilled, (state, action) => {
      state.loading = false;
      state.oneUser = action.payload;
    });
    builder.addCase(updateStateBlock.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
