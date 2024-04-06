import { createSlice } from "@reduxjs/toolkit";

const initCart = {
    items: [],
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: "Cart",
    initialState: initCart,
    reducers: {

        setCart(state, payload) {
            const cart = payload.payload;
            state.items = cart.items;
            state.totalQuantity = cart.totalQuantity;
        },

        addToCart(state, payload) {
            const item = payload.payload;
            let items = state.items;
            const position = items.findIndex((item) => {
                return item.product.toString() === item.productId;
            });
            if (position > -1) {
                items[position].quantity = items[position].quantity + item.quantity
            } else {
                items.push({
                    product: item.productId,
                    quantity: item.quantity
                })
            }
            state.items = items;
            state.totalQuantity = state.totalQuantity + item.quantity;
        },
        deleteProductInCart(state, payload) {
            const productId = payload.payload;
            let items = state.items;
            const position = items.findIndex((item) => {
                return item.product.toString() === productId;
            });
            const quantityItem = items[position].quantity;
            if (position > -1) {
                items.splice(position, 1)
                state.totalQuantity = state.totalQuantity - quantityItem;
            }
            // state.items = items;
        },
        decreaseProductInCart(state, payload) {
            const productId = payload.payload;
            let items = state.items;
            const position = items.findIndex((item) => {
                return item.product.toString() === productId;
            });
            if (position > -1) {
                items[position].quantity = items[position].quantity - 1
                state.totalQuantity = state.totalQuantity - 1;
            }
        }
    }
});

const cartReducer = cartSlice.reducer;
const cartAction = cartSlice.actions;

export default cartReducer;

export {
    cartAction
}