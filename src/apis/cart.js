
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

const getProductByIdApi = async (id) => {
    try {
        const response = await axiosInstance.get(`/product/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
}


const getRelativeProductApi = async (categoryId) => {
    try {
        const response = await axiosInstance.get(`/product-by-category/${categoryId}`);
        return response;
    } catch (error) {
        return error.response;
    }
}

const getProductsByParamsApi = async (page, { categoryId, name }) => {
    try {
        const response = await axiosInstance.get(`/products?page=${page}&categoryId=${categoryId ? categoryId : ''}&name=${name ? name : ''}`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    addToCartApi,
    getCartApi,
    getProductByIdApi,
    getRelativeProductApi,
    getProductsByParamsApi,
}