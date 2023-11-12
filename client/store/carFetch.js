import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allCars: [],
  carFiltred: [],
  loading: false,
  error: null,
  OneCar: {},
  agencyCar: [],
  fixedData: [],
  bookMarks: [],
  succes: null,
  RentDetails: {},
};
export const getOnecarById = createAsyncThunk(
  "car/getOnecarById",
  async (id) => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/car/carById/${id}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getallCarByAgency = createAsyncThunk(
  "car/getallCarByAgency",
  async (id) => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/car/allCarByAgency/${id}`
        // ,{ AgencyId: id }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletedAgencyCar = createAsyncThunk(
  "car/deletedAgencyCar",
  async (body) => {
    const { id, AgencyId } = body;
    try {
      console.log(body, "body");
      const response = await axios.delete(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/car/deletedCar/${id}/${AgencyId}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAllCars = createAsyncThunk("car/getAllCars", async () => {
  try {
    const response = await axios.get(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/car/allCars`
    );
    console.log(response.data, "response");
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
});

export const fetchFilteredCars = createAsyncThunk(
  "car/fetchFilteredCars",
  async (filterCriteria) => {
    try {
      console.log(filterCriteria, "first");
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/car/filtredCar`,
        filterCriteria
      );
      console.log(response.data, "final");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const createCar = createAsyncThunk("car/createCar", async (params) => {
  if (!params) return;
  try {
    console.log(params,'here')
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/car/newCar`,
      params.body
    ); 
    console.log('response',response.data);
    const requestId = response.data.id;
   
  
    await axios.post(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/media/add/car/${requestId}`,
      params.media
    );
    console.log(body, "body");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const createImgeForCar = createAsyncThunk(
  "car/createImgeForCar",
  async (id) => {
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/car/imageCar`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllBoolMarks = createAsyncThunk(
  "car/getAllBoolMarks",
  async (id) => {
    console.log("bookmarks", id);
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/bookmarks/getAll/${id}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const CreateBookMark = createAsyncThunk(
  "car/CreateBookMark",
  async (body) => {
    try {
      console.log(body, "body before");

      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/bookmarks/add`,
        body
      );

      console.log(body, "body");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removedBookMark = createAsyncThunk(
  "car/removedBookMark",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:5000/api/bookmarks/delete/${id}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    filterCars: (state, action) => {
      state.allCars = action.payload;
    },
    saveDetails: (state, action) => {
      state.RentDetails = action.payload;
    },
    carDetail: (state, action) => {
      state.OneCar = action.payload;
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
      state.fixedData = action.payload;
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
      state.carFiltred = action.payload; // Set filtered cars in the state
    });
    builder.addCase(fetchFilteredCars.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getOnecarById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOnecarById.fulfilled, (state, action) => {
      state.loading = false;
      state.OneCar = action.payload; // Set filtered cars in the state
    });
    builder.addCase(getOnecarById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(createCar.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createCar.fulfilled, (state, action) => {
      state.loading = false;
      // Set filtered cars in the state
    });

    builder.addCase(createCar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(createImgeForCar.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createImgeForCar.fulfilled, (state, action) => {
      state.loading = false;
      // Set filtered cars in the state
    });
    builder.addCase(createImgeForCar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllBoolMarks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllBoolMarks.fulfilled, (state, action) => {
      state.loading = false;
      state.bookMarks = action.payload;
    });
    builder.addCase(getAllBoolMarks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(CreateBookMark.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(CreateBookMark.fulfilled, (state, action) => {
      state.loading = false;
      state.succes = action.payload;
    });
    builder.addCase(CreateBookMark.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(removedBookMark.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removedBookMark.fulfilled, (state, action) => {
      state.loading = false;
      state.succes = action.payload;
    });
    builder.addCase(removedBookMark.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getallCarByAgency.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getallCarByAgency.fulfilled, (state, action) => {
      state.loading = false;
      state.agencyCar = action.payload;
    });
    builder.addCase(getallCarByAgency.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deletedAgencyCar.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletedAgencyCar.fulfilled, (state, action) => {
      state.loading = false;
      state.succes = action.payload;
    });
    builder.addCase(deletedAgencyCar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { filterCars, saveDetails, carDetail } = carSlice.actions;
export default carSlice.reducer;
