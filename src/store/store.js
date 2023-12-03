import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from "./slice/ProductReducer";
import authentication from "./slice/AuthenticationReducer";
import authnReducer from "./slice/authn";
import cartReducer from "./slice/cart";

const rootReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
    authentication: authentication,
    authn: authnReducer
})


const store = configureStore({
    reducer: rootReducer
})

export default store