// import setHeaders from "../utils/setHeaders";

import axiosInstance from "../config/axios";

const getTopTrendingProductApi = async () => {
    try {
        const response = await axiosInstance.get(`/top-trending-product`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getTopTrendingProductApi,
}