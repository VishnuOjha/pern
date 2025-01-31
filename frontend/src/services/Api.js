import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // Include credentials (cookies, auth headers)
});

export default API