
import axiosInstance from "../config/axios";
import axiosCustomerInstance from "../config/axiosCustomer";

const getTopTrendingProductApi = async () => {
    try {
        const response = await axiosCustomerInstance.get(`/top-trending-product`);
        return response;
    } catch (error) {
        return error.response;
    }
}

const getProductsApi = async () => {
    try {
        const response = await axiosCustomerInstance.get(`/products`);
        return response;
    } catch (error) {
        return error.response;
    }
}

const getProductByIdApi = async (id) => {
    try {
        const response = await axiosCustomerInstance.get(`/product/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
}


const getRelativeProductApi = async (categoryId) => {
    try {
        const response = await axiosCustomerInstance.get(`/product-by-category/${categoryId}`);
        return response;
    } catch (error) {
        return error.response;
    }
}

const getProductsByParamsApi = async (page, { categoryId, name }) => {
    try {
        const response = await axiosCustomerInstance.get(`/products?page=${page}&categoryId=${categoryId ? categoryId : ''}&name=${name ? name : ''}`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getTopTrendingProductApi,
    getProductsApi,
    getProductByIdApi,
    getRelativeProductApi,
    getProductsByParamsApi,
}