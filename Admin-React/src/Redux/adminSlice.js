import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    admin: {},
    // adminToken: "",
    // reviews: [],
    allUsers: [],
    staticAllUsers: [],
    allCars: [],
    requests: [],
    oneUser: {},
    refreshed: false,
    loggedIn: false,
    error: null,
    loading: false,
    approvedRental: [],
    PendingRental: [],
    RejectedRental: [],
    foreignUser: {}
};
export const updateStateBlock = createAsyncThunk(
    "user/updateStateBlock",
    async (id) => {
        try {
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
    async (request) => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:5000/api/agency/addAgency/${request.id}`,
                { UserId: request.UserId }
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
            console.log(id);
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
export const getApprovedServices = createAsyncThunk(
    "admin/approvedHistory",
    async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:5000/api/booking/rentalHistory`
            )
            return response.data
        } catch (er) {
            console.error(er);
        }
    }
)
export const getRejectedServices = createAsyncThunk(
    "admin/rejectedHistory",
    async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:5000/api/booking/rejectedHistory`
            )
            return response.data
        } catch (er) {
            console.error(er);
        }
    }
)
export const getPendingServices = createAsyncThunk(
    "admin/pendingHistory",
    async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:5000/api/booking/pedningHistory`
            )
            return response.data
        } catch (er) {
            console.error(er);
        }
    }
)
export const getAllCars = createAsyncThunk(
    "admin/getAllCars",
    async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:5000/api/car/allCars`
            )
            return response.data
        } catch (er) {
            console.error(er);
        }
    }
)
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
export const getData = createAsyncThunk("user/getADminData", async (token) => {
    try {
        // const token = JSON.stringify(localStorage.getItem("Token"))
        const response = await axios.post(
            `http://localhost:5000/api/admin/useToken`,
            { token:token }
        )
        // setAdminData(response.data)
        return response.data;
    } catch (err) {
        console.error(err);
    }
});
export const Login = createAsyncThunk("user/Login", async ({ email, password },thunkAPI) => {
    try {
        const data = { email, password }
        const response = await axios.post(
            `http://localhost:5000/api/admin/emailLogin`,
            data
        )
        localStorage.setItem("Token", response.data)
        const token=localStorage.getItem("Token")
        thunkAPI.dispatch(getData(token));
        return response.data;
    } catch (err) {
        console.error(err);
    }
});
export const Sort = createAsyncThunk("user/Sort", async (dataType) => {
    try {
        let task = {}
        !dataType.includes("desc") ?
            task = await axios.get(
                `http://localhost:5000/api/users/sort/${dataType}`
            ) :
            task = await axios.get(
                `http://localhost:5000/api/users/invSort/${dataType}`
            )
        return task.data
    } catch (er) {
        console.error(er);
    }
})
export const getUserById = createAsyncThunk("user/getById", async (id) => {
    try {
        const task = await axios.get(
            `http://localhost:5000/api/users/getById/${id}`
        )
        return task.data
    } catch (er) {
        console.error(er);
    }
})
export const adminSlicer = createSlice({
    name: "admin",
    initialState,
    reducers: {
        filterUsers: (state, action) => {
            state.allUsers = action.payload
        },
        triggerRefresh: (state) => {
            state.refreshed = !state.refreshed;
        },
        setAdminData: (state, action) => {
            // const { admin } = action.payload;
            state.admin = action.payload
        },
        logout: (state) => {
            state.admin = "";
            state.loggedIn = false;
            localStorage.removeItem("Token")
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getData.fulfilled, (state, action) => {
            state.loading = false;
            state.admin = action.payload;
        });
        builder.addCase(getData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(Login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(Login.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedIn = true;
        });
        builder.addCase(Login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.loggedIn = false;
        });
        builder.addCase(getUserById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.foreignUser = action.payload;
        });
        builder.addCase(getUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getAllCars.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllCars.fulfilled, (state, action) => {
            state.loading = false;
            state.allCars = action.payload;
        });
        builder.addCase(getAllCars.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getApprovedServices.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getApprovedServices.fulfilled, (state, action) => {
            state.loading = false;
            state.approvedRental = action.payload;
        });
        builder.addCase(getApprovedServices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getRejectedServices.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getRejectedServices.fulfilled, (state, action) => {
            state.loading = false;
            state.RejectedRental = action.payload;
        });
        builder.addCase(getRejectedServices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getPendingServices.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getPendingServices.fulfilled, (state, action) => {
            state.loading = false;
            state.PendingRental = action.payload;
        });
        builder.addCase(getPendingServices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(Sort.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(Sort.fulfilled, (state, action) => {
            state.loading = false;
            state.allUsers = action.payload;
        });
        builder.addCase(Sort.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.allUsers = action.payload;
            state.staticAllUsers = action.payload;
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
        builder.addCase(approveRequest.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(approveRequest.fulfilled, (state, action) => {
            state.loading = false;
            // state.oneUser = action.payload;
        });
        builder.addCase(approveRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getAllRequests.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        // builder.addCase(getAllRequests.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.requests = action.payload;
        // });
        // builder.addCase(getAllRequests.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.error.message;
        // });
        // builder.addCase(fetchReviews.fulfilled, (state, action) => {
        //     state.reviews = action.payload
        // })
    }
})

export const selectAdmin = (state) => state.Admin.admin;
export const selectAllUsers = (state) => state.Admin.allUsers;
export const selectStaticAllUsers = (state) => state.Admin.staticAllUsers;
export const selectApproved = (state) => state.Admin.approvedRental;
export const selectPending = (state) => state.Admin.PendingRental;
export const selectRejected = (state) => state.Admin.RejectedRental;
export const selectAllCars = (state) => state.Admin.allCars;
export const selectReviews = (state) => state.Admin.reviews;
export const selectLoggedIn = (state) => state.Admin.loggedIn;
export const selectForeignUser = (state) => state.Admin.foreignUser;
export const { filterUsers, setAdminData, logout, setLoggedIn } = adminSlicer.actions;
export const { triggerRefresh } = adminSlicer.actions;
export default adminSlicer.reducer;