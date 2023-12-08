import axiosCustomerInstance from "../config/axiosCustomer";
import setHeaders from "../util/setHeaders";

const checkoutApi = async (token, order) => {
    try {
        const response = await axiosCustomerInstance.post(`/checkout`, order, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const getOrdersApi = async (token) => {
    try {
        const response = await axiosCustomerInstance.get(`/orders`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const getOrderDetailApi = async (token, id) => {
    try {
        const response = await axiosCustomerInstance.get(`/order/${id}`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}
export {
    checkoutApi,
    getOrdersApi,
    getOrderDetailApi,
}