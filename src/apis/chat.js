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

const createRoomChatApi = async (userId) => {
    try {
        console.log(userId)
        const response = await axiosCustomerInstance.post('/createRoomChat', {
            userId: userId,
        });
        return response
    } catch (error) {
        return error.response;
    }
}


export {
    sendMessageApi,
    createRoomChatApi,
}