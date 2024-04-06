import axiosCustomerInstance from "../config/axiosCustomer";

const sendMessageApi = async (message, roomId) => {
    try {
        console.log(roomId)
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

const getRoomChatByUserIdApi = async (userId, roomId) => {
    try {
        console.log(userId)
        const response = await axiosCustomerInstance.post('/room-chat-user', {
            userId: userId,
            roomId: roomId,
        });
        return response
    } catch (error) {
        return error.response;
    }
}


export {
    sendMessageApi,
    createRoomChatApi,
    getRoomChatByUserIdApi
}