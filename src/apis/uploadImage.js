import axiosCustomerInstance from '../config/axiosCustomer';

const uploadImageApi = async (formData) => {
    try {
        const response = axiosCustomerInstance.post('/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        return response;
    } catch (error) {
        return error.response
    }
}

export default uploadImageApi;