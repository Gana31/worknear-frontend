import { toast } from "react-toastify";
import apiClient from "../ApiConnector.js";
import { setLoading, setLoginData } from "../../Slices/authSlice";

export function Register(data, navigate) {
    return async (dispatch) => {
        console.log(data)
      dispatch(setLoading(true))
      try {
        const response = await apiClient.post("/register", data);
        console.log(response)
          if (response.data.success) {
            toast.success(`${data.account_type} ${response.data.message}`);
            
          } else {
            console.log("reseger reposnse",response)
            toast.error(response.data.message);
          }
      } catch (error) {
        // console.log("LOGIN API ERROR............", error)
        toast.error(error.response.data.message ||"Login Failed")
      }
      dispatch(setLoading(false))

    }
  }

export function login(data, navigate) {
    return async (dispatch) => {
      dispatch(setLoading(true))
      try {
        const response = await apiClient.post('/login', data);
          if (response.data.success) {
            const {user2 } = response.data.data;

            localStorage.setItem('accessToken', true);
            localStorage.setItem('user',JSON.stringify( user2))
            navigate('/');
            toast.success('Logged in successfully');
            dispatch(setLoginData({user: user2,accessToken : true}))
            
          } 
            navigate("/")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.response.data.message || "Login Failed")
      }
      dispatch(setLoading(false))

    }
  }



  export function logout(data, navigate) {
    return async (dispatch) => {
      dispatch(setLoading(true))
      try {
        const response = await apiClient.post('logout', data);
          if (response.data.success) {
            const {user2 } = response.data.data;

            localStorage.setItem('accessToken', true);
            localStorage.setItem('user',JSON.stringify( user2))
            navigate('/');
            toast.success('Logged in successfully');
            dispatch(setLoginData({user: user2,accessToken : true}))
            
          } 
            navigate("/")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.response.data.message || "Login Failed")
      }
      dispatch(setLoading(false))

    }
  }