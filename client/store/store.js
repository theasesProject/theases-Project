import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import carReducer from "./carFetch";
import agencyReducer from "./agencySlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    car: carReducer,
    agency: agencyReducer, // Add other slices as needed
  },
});

export default store;
