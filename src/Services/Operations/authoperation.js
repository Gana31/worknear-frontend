import { toast } from "react-toastify";
import apiClient from "../ApiConnector.js";
import { setLoading, setLoginData } from "../../Slices/authSlice";

export function Register(data, navigate,setIsSignUp) {
    return async (dispatch) => {
      dispatch(setLoading(true))
      try {
        const response = await apiClient.post("/register", data);

          if (response.data.success) {
            toast.success(`${data.account_type} ${response.data.message}`);
            setIsSignUp(false)
          } else {

            toast.error(response.data.message);
          }
      } catch (error) {

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
            navigate('/profile');
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



  export function logout(navigate) {
    return async (dispatch) => {

      try {
        const response = await apiClient.post("/logout");
          if (response.data.success) {
            dispatch(setLoginData({ user: null, accessToken: null }))
            localStorage.removeItem("accessToken")
            localStorage.removeItem("user")
            toast.success("Logged Out Successfully")
            navigate("/")  
          } else {
            console.log("reseger reposnse",response)
            toast.error(response.data.message);
          }
     
    }catch (error) {
      // console.log("LOGIN API ERROR............", error)
      toast.error(error.response.data.message ||"Login Failed")
      navigate("/")
    }
  }
}