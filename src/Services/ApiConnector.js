import axios from 'axios';
import { toast } from 'react-toastify';
import { APP_URL } from './constant.js';
import { store } from '../main.jsx';
axios.defaults.withCredentials = true;

const apiClient = axios.create({
    baseURL: APP_URL,
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response } = error;
        // console.log(error);
        if (response.data && response.status === 401) {
            const message = response.data.message;
            
            // Case when both accessToken and refreshToken are invalid
            if (message === "Session expired. Please log in again." || message === "Unauthorized. Invalid refresh token.") {
                // Call the backend logout API to clear cookies
                try {
                  console.log("calleeeed")
                    localStorage.removeItem("accessToken")
                    localStorage.removeItem("user")
                    store.dispatch(setLoginData({ user: null, accessToken: null }));
                    window.location.href = '/'; 
                    toast.error("Your Session Expired. Please Log In Again");
                } catch (logoutError) {
                    console.error("Error during logout API call:", logoutError);
                    toast.error("Logout failed. Please try again.");
                }
            } 
            // Case when access token expired and refresh token is still valid
            else if (message === "Access token expired or invalid") {
                // window.location.reload();
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;