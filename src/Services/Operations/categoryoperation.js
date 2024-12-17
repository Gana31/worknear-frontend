import apiClient from "../ApiConnector.js"; // assuming this is where your API client is defined
import { setCategories, setLoading, setError, addCategory, editCategory, deleteCategory } from "../../Slices/categorySlice";
import { toast } from "react-toastify";

// Fetch categories from API
export const fetchCategories = (userId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.get(`/getusercategories`);
      if (response.data.success) {
        dispatch(setCategories(response.data.data));
      } else {
        dispatch(setError(response.data.message));
      }
    } catch (error) {
      dispatch(setError(error.response.data.message || "Failed to fetch categories"));
    }
    dispatch(setLoading(false));
  };
};

// Add new category
export const addNewCategory = (categoryData) => {
  return async (dispatch) => {
    try {
      const response = await apiClient.post("/createcategories", categoryData);
      if (response.data.success) {
        dispatch(addCategory(response.data.data));
        toast.success("Your category is added")
      } else {
        dispatch(setError(response.data.message));
      }
    } catch (error) {
        toast.error(error.response.data.message || "something wrong in adding category")
      dispatch(setError(error.response.data.message || "Failed to add category"));
    }
  };
};

// Edit category
export const updateCategory = (categoryId, newName) => {
  return async (dispatch) => {
    try {
      const response = await apiClient.put(`/updatecategories`, { name: newName ,id:categoryId });
      if (response.data.success) {
        dispatch(editCategory({ categoryId, newName }));
        toast.success("Your category is updated")
      } else {
        dispatch(setError(response.data.message));
      }
    } catch (error) {
        toast.error(error.response.data.message || "something wrong in updatng category")
      dispatch(setError(error.response.data.message || "Failed to update category"));
    }
  };
};

// Delete category
export const removeCategory = (categoryId) => {
  return async (dispatch) => {
    try {
        console.log(categoryId)
      const response = await apiClient.post(`/deletecategories`,{id:categoryId});
      if (response.data.success) {
        dispatch(deleteCategory(categoryId));
        toast.success("Your category is removed")
      } else {
        dispatch(setError(response.data.message));
      }
    } catch (error) {
        toast.error(error.response.data.message || "something wrong in deleting category")
      dispatch(setError(error.response.data.message || "Failed to delete category"));
    }
  };
};
