const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    products: []
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload
        }
    },
})

const productsAction = productsSlice.actions
const productsReducer = productsSlice.reducer

export {
    productsAction
}

export default productsReducer