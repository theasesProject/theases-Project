import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "./adminSlice";
import userReducer from "./dachboardAdmin";
export const store = configureStore({
  reducer: {
    Admin: AdminReducer,
    user: userReducer,
  },
});

export default store;
