import { createSlice } from "@reduxjs/toolkit";

const initAuthn = {
    isAuthn: false,
    // cart: {
    //     items: []
    // }
}

const authnSlice = createSlice({
    name: "Authentication",
    initialState: initAuthn,
    reducers: {
        login(state, payload) {
            const user = payload.payload;
            state.token = user.token;
            state.isAuthn = true;
            state.id = user.id;
            state.email = user.email;
            state.fullName = user.fullName;
            state.phoneNumber = user.phoneNumber;
            state.avatar = user.avatar;
            // state.cart = user.cart
        },
        logout(state) {
            state.isAuthn = false;
        },

        setUser(state, payload) {
            const user = payload.payload;
            state.token = user.token;
            state.isAuthn = true;
            state.id = user.id;
            state.email = user.email;
            state.fullName = user.fullName;
            state.phoneNumber = user.phoneNumber;
            state.avatar = user.avatar;
            // state.cart = user.cart
        }
    }
})

const authnReducer = authnSlice.reducer;
const authnAction = authnSlice.actions;

export default authnReducer;

export {
    authnAction
}