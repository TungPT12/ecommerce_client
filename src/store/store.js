import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import authnReducer from "./slice/authn";
import cartReducer from "./slice/cart";

const rootReducer = combineReducers({
    cart: cartReducer,
    authn: authnReducer
})


const store = configureStore({
    reducer: rootReducer
})

export default store