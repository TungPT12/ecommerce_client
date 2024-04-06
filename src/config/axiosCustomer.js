import axios from 'axios';

const axiosCustomerInstance = axios.create({
    // baseURL: 'http://localhost:5000/api/',
    // baseURL: 'https://tungstore.onrender.com/api/',
    baseURL: process.env.REACT_APP_API_LOCALHOST_ENDPOINT,
    withCredentials: true
});

export default axiosCustomerInstance;