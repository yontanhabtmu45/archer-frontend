import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:2716/api'
    baseURL: 'https://backend-archer.onrender.com/api'
})

export default axiosInstance