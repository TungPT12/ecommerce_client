
const setInitState = () => {
    const initState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : null
    if (initState) {
        return {
            listCart: initState.listCart,
            totalQuantity: initState.totalQuantity
        }
    } else {
        return {
            listCart: [],
            totalQuantity: 0
        };

    }
}

const increaseQuantity = (updateId, listCart, newTotalQuantity) => {
    const updatePosition = listCart.findIndex((item) => {
        return item.id === updateId
    })


    const quantityItemUpdate = listCart[updatePosition].quantity

    listCart[updatePosition] = {
        ...listCart[updatePosition],
        quantity: quantityItemUpdate + 1
    }

    return {
        listCart: [...listCart],
        totalQuantity: newTotalQuantity + 1
    }
}

const decreaseQuantity = (updateId, listCart, totalQuantity) => {
    const updatePosition = listCart.findIndex((item) => {
        return item.id === updateId
    })

    const quantityItemUpdate = listCart[updatePosition].quantity

    if (quantityItemUpdate === 1) {
        return {
            listCart: [...listCart],
            totalQuantity: totalQuantity
        }
    }
    listCart[updatePosition] = {
        ...listCart[updatePosition],
        quantity: quantityItemUpdate - 1
    }
    return {
        listCart: [...listCart],
        totalQuantity: totalQuantity - 1
    }
}

const initState = setInitState()


function CartReducer(state = initState, action) {
    switch (action.type) {
        case "SET_CART":
            let cart = action.cart
            let totalQuantity = 0
            cart.forEach(item => {
                totalQuantity = totalQuantity + item.quantity;
            });
            state = {
                listCart: cart,
                totalQuantity: totalQuantity
            }
            localStorage.setItem("cart", JSON.stringify(state))
            return state
        case "ADD_CART":
            const item = action.item;
            const position = state.listCart.findIndex((cartItem) => {
                return cartItem.id === item.id
            })
            if (position > -1) {
                let listCart = [...state.listCart]
                listCart[position] = {
                    ...listCart[position],
                    quantity: listCart[position].quantity + item.quantity
                }
                state = {
                    listCart: listCart,
                    totalQuantity: state.totalQuantity + item.quantity
                }
            } else {
                state = {
                    listCart: [...state.listCart, item],
                    totalQuantity: state.totalQuantity + item.quantity
                }
            }
            localStorage.setItem("cart", JSON.stringify(state))
            return state
        case "UPDATE_CART":
            const updateId = action.id;
            const actionUpdate = action.actionUpdate
            let listCartUpdate = [...state.listCart]
            let totalQuantityUpdate = state.totalQuantity;

            if (actionUpdate === "INCREASE") {
                state = increaseQuantity(updateId, listCartUpdate, totalQuantityUpdate)
            } else {
                state = decreaseQuantity(updateId, listCartUpdate, totalQuantityUpdate)
            }

            localStorage.setItem("cart", JSON.stringify(state))
            return state
        case "DELETE_CART":
            const deleId = action.id;
            const delePosition = state.listCart.findIndex((item) => {
                return item.id === deleId
            })

            let listCartDelete = [...state.listCart]
            listCartDelete.splice(delePosition, 1)
            let totalQuantityDelete = 0
            listCartDelete.forEach(item => {
                totalQuantityDelete = totalQuantityDelete + item.quantity;
            });

            state = {
                listCart: [...listCartDelete],
                totalQuantity: totalQuantityDelete
            }
            localStorage.setItem("cart", JSON.stringify(state))
            return state
        default:
            return state
    }
}

export default CartReducer;