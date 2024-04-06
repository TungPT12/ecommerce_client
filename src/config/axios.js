import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000/',
    // baseURL: 'https://tungstore.onrender.com/',
    baseURL: process.env.REACT_APP_API_LOCALHOST_ENDPOINT,
    withCredentials: true
});

export default axiosInstance;