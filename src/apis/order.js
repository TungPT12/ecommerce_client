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

const getTransactionsApi = async (token) => {
    try {
        const response = await axiosCustomerInstance.get(`/transactions`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}
export {
    checkoutApi,
    getTransactionsApi,
}