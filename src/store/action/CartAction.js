
const addToCart = (item) => {
    return {
        type: "ADD_CART",
        item: item,
    }
}
const updateItemInCart = (id, actionUpdate) => {
    return {
        type: "UPDATE_CART",
        id: id,
        actionUpdate: actionUpdate,
    }
}
const deleteItemInCart = (id) => {
    return {
        type: "DELETE_CART",
        id: id,
    }
}

const setCartUserLogin = (cart) => {
    return {
        type: "SET_CART",
        cart: cart
    }
}

export {
    addToCart,
    updateItemInCart,
    deleteItemInCart,
    setCartUserLogin,
}