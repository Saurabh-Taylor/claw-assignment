import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://claw-assignment-task-1.onrender.com/api/v1',
    withCredentials: true, // to set the cookie on client side
})