import axiosCustomerInstance from "../config/axiosCustomer";

const signin = async (email, password) => {
    try {
        const response = await axiosCustomerInstance.post('/login', {
            email: email,
            password: password
        });
        return response
    } catch (error) {
        return error.response;
    }
}

const signup = async (user) => {
    try {
        const response = await axiosCustomerInstance.post('/signup', user);
        return response
    } catch (error) {
        return error.response;
    }
}

const checkIsLoginApi = async () => {
    try {
        const response = await axiosCustomerInstance.post('/access-token');
        return response
    } catch (error) {
        return error.response;
    }
}

export {
    signin,
    checkIsLoginApi,
    signup
}