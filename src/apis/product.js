
import axiosInstance from "../config/axios";

const getTopTrendingProductApi = async () => {
    try {
        const response = await axiosInstance.get(`/top-trending-product`);
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

export {
    getTopTrendingProductApi,
    getProductByIdApi,
}