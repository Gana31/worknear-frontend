import {combineReducers} from "@reduxjs/toolkit"
import authReducer from '../Slices/authSlice'
import categoryReducer from "../Slices/categorySlice"
const rootReducer  = combineReducers({
    auth: authReducer,
    categories: categoryReducer,
    // product:productReducer,
    // cart:cartReducer,
})

export default rootReducer