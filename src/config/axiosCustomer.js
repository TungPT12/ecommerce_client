import axios from 'axios';

const axiosCustomerInstance = axios.create({
    // baseURL: 'http://localhost:5000/api/',
    baseURL: 'https://tungstore.onrender.com/api/',
    withCredentials: true
});

export default axiosCustomerInstance;