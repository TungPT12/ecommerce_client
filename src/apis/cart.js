
import axiosCustomerInstance from "../config/axiosCustomer";
import setHeaders from "../util/setHeaders";

const addToCartApi = async (token, id, quantity) => {
    try {
        const response = await axiosCustomerInstance.post(`/cart`, {
            productId: id,
            quantity: quantity
        }, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const getCartApi = async (token) => {
    try {
        const response = await axiosCustomerInstance.get(`/cart`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const deleteProductInCartApi = async (token, productId) => {
    try {
        console.log(productId)
        const response = await axiosCustomerInstance.delete(`/cart/${productId}`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const decreaseProductInCartApi = async (token, productId) => {
    try {
        const response = await axiosCustomerInstance.put(`/cart`, {
            productId: productId
        }, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    addToCartApi,
    getCartApi,
    deleteProductInCartApi,
    decreaseProductInCartApi
}