import axiosCustomerInstance from "../config/axiosCustomer";

const getCategoriesApi = async (token) => {
    try {
        const response = await axiosCustomerInstance.get(`/categories`);
        return response;
    } catch (error) {
        return error.response;
    }
}

const getNumberHotelInRandomAreaApi = async () => {
    try {
        const response = await axiosCustomerInstance.get(`/area/three-random/count-hotel`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getCategoriesApi,
    getNumberHotelInRandomAreaApi,
}