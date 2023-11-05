import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import carReducer from "./carFetch";
import agencyReducer from "./agencySlice";
import location from "./locationSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    car: carReducer,
    agency: agencyReducer,
    location:location, // Add other slices as needed
  },
});

export default store;
