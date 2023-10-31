import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import carReducer from "./carFetch"

const store = configureStore({

  reducer: {
    user: userReducer,
    car: carReducer // Add other slices as needed
    
  },

});

export default store;
