import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allUsers: [],
  requests: [],
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
export const approveRequest = createAsyncThunk(
  "user/approveRequest",
  async (input) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/api/agency/addAgency`,{UserId:input.id,companyNumber:input.companyNumber,transportation:input.transportation,name:input.agencyName,deposit:input.deposit,address:input.address}
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const declineRequest = createAsyncThunk(
  "user/approveRequest",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/api/request/decline/${id}`
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

export const getAllRequests = createAsyncThunk(
  "user/getAllRequests",
  async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/request/getAllUnverified`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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

    // get all requests

    builder.addCase(getAllRequests.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllRequests.fulfilled, (state, action) => {
      state.loading = false;
      state.requests = action.payload;
    });
    builder.addCase(getAllRequests.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
