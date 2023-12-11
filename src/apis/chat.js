import axiosInstance from "../config/axios";
import axiosCustomerInstance from "../config/axiosCustomer";

const sendMessageApi = async (message, roomId) => {
    try {
        const response = await axiosCustomerInstance.post('/sendMessage', {
            message: message,
            isClient: true,
            roomId: roomId,
        });
        return response
    } catch (error) {
        return error.response;
    }
}


export {
    sendMessageApi,
}