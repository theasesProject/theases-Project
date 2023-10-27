
import { configureStore } from '@reduxjs/toolkit'
import carReducer from "./carFetch"


 const store = configureStore({
    reducer: {
        car: carReducer,
       
    }
})

export default store



