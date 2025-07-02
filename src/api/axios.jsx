import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:2716/api'
})

export default axiosInstance