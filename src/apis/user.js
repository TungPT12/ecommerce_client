import axiosCustomerInstance from "../config/axiosCustomer";
import axiosInstance from "../configs/axios/axios";
const register = async (user) => {
    try {
        const response = await axiosCustomerInstance.post(`/signup`, user);
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    register
}