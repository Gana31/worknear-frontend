import { toast } from "react-toastify";
import { setLoading } from "../../Slices/authSlice.js";
import apiClient from "../ApiConnector.js";



export function createPost(data, navigate) {
    return async (dispatch) => {
      dispatch(setLoading(true))
      try {
        const response = await apiClient.post("/createposts", data);

          if (response.data.success) {
            toast.success(`Post is created`);
            dispatch(setLoading(false))
          } else {

            toast.error(response.data.message);
          }
      } catch (error) {
            // console.log(error)
        toast.error(error.response.data.message ||"Post Creation  Failed")
      }
      dispatch(setLoading(false))

    }
  }


  
export function updatePost(data,form,navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      form.id = data
      const response = await apiClient.post(`/updateposts/${data}`, form);
        if (response.data.success) {
          toast.success(`Post is update`);
          dispatch(setLoading(false))
          navigate("/old-post")
        } else {

          toast.error(response.data.message);
        }
    } catch (error) {
          // console.log(error)
      toast.error(error.response.data.message ||"Post Creation  Failed")
    }
    dispatch(setLoading(false))

  }
}