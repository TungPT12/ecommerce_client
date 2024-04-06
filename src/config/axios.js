import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000/',
    baseURL: 'https://tungstore.onrender.com/',
    withCredentials: true
});

export default axiosInstance;