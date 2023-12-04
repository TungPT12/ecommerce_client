
import axiosInstance from "../config/axios";
import setHeaders from "../util/setHeaders";

const addToCartApi = async (token, id, quantity) => {
    try {
        const response = await axiosInstance.post(`/cart`, {
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
        const response = await axiosInstance.get(`/cart`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const deleteProductInCartApi = async (token, productId) => {
    try {
        console.log(productId)
        const response = await axiosInstance.delete(`/cart/${productId}`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const decreaseProductInCartApi = async (token, productId) => {
    try {
        const response = await axiosInstance.put(`/cart`, {
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