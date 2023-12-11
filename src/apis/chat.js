import axiosInstance from "../configs/axios/axios";

const sendMessage = async (message, roomId, userId) => {
    try {
        const response = await axiosInstance.post('/sendMessage', {
            message: message,
            roomId: roomId,
            userId: userId,
        });
        return response
    } catch (error) {
        return error.response;
    }
}


export {
    sendMessage,
}