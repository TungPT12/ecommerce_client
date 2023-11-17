import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import CartReducer from "./reducer/CartReducer";
import productsReducer from "./reducer/ProductReducer";
import authentication from "./reducer/AuthenticationReducer";

const rootReducer = combineReducers({
    cart: CartReducer,
    products: productsReducer,
    authentication: authentication,
})


const store = configureStore({
    reducer: rootReducer
})

export default store