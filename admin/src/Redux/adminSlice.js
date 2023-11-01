import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    admin: {},
    adminToken: "",
    reviews: [],
    loggedIn: false,
};
export const fetchReviews = createAsyncThunk("admin/fetchReviews", async () => {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/review/BringData`
        )
        return response.data;
    } catch (err) {
        console.error(err);
    }
});
export const Login = createAsyncThunk("user/Login", async ({endPoint, checkedIdentifier, password, identifier}) => {
    try {
        const data = {[checkedIdentifier]: identifier, password};
        console.log(data);
        const response = await axios.post(
            `http://localhost:5000/api/admin/${endPoint}`,
            data
        )
        localStorage.setItem("Token", response.data)
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
    }, extraReducers: (builder) => {
        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            state.reviews = action.payload
        })
    }
})

export const { setAdmin, logout, setLoggedIn } = adminSlicer.actions;
export const selectAdmin = (state) => state.Admin.admin;
export const selectReviews = (state) => state.Admin.reviews;
export const selectLoggedIn = (state) => state.Admin.loggedIn;
export default adminSlicer.reducer;