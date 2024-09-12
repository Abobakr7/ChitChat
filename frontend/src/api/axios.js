import axios from "axios";
import Header from "../components/layout/Header";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
        ) {
            if (Header.handleLogout instanceof Function) {
                Header.handleLogout();
            }
        }
        return Promise.reject(error);
    }
);

export default api;
