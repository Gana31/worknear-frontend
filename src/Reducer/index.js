import {combineReducers} from "@reduxjs/toolkit"
import authReducer from '../Slices/authSlice'
const rootReducer  = combineReducers({
    auth: authReducer,
    // product:productReducer,
    // cart:cartReducer,
})

export default rootReducer