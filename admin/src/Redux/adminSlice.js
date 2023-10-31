import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"



const initialState = {
    admin: {},
    adminToken: "",
    loggedIn: false,
};
const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
    try {
      // Replace this with your actual API call to fetch the user
      const response = await axios.post(
        `http://localhost:5000/api/admin/token`,
        {
          token: token,
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  });
export const adminSlicer = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            const { admin } = action.payload;
            state.admin = admin
        },
        logout: (state) => {
            state.admin = "";
            state.loggedIn = false;
            localStorage.removeItem('adminToken')
        },
        setLoggedIn: (state, action) => {
            const { token, loggedIn } = action.payload;
            localStorage.setItem('adminToken', JSON.stringify(token));
            state.adminToken = token;
            state.loggedIn = loggedIn;
        }
    }
})

export const { setAdmin, logout, setLoggedIn } = adminSlicer.actions;
export const selectAdmin =(state)=> state.admin.admin;
export const selectLoggedIn =(state)=> state.admin.loggedIn;
export default adminSlicer.reducer;