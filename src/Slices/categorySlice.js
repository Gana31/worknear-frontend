import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const categorySlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        id: Date.now(),
        name: action.payload.name,
        services: [],
      };
      toast.success("Category added successfully!");
      state.push(newCategory);
    },
    addService: (state, action) => {
      const { categoryId, service } = action.payload;
      const category = state.find((cat) => cat.id === categoryId);
      if (category) {
        category.services.push({
          id: Date.now(),
          name: service.name,
          description: service.description,
        });
        toast.success("Service added successfully!");
      } else {
        toast.error("Category not found!");
      }
    },
    deleteCategory: (state, action) => {
      const categoryId = action.payload;
      return state.filter((category) => category.id !== categoryId);
    },
    deleteService: (state, action) => {
      const { categoryId, serviceId } = action.payload;
      const category = state.find((cat) => cat.id === categoryId);
      if (category) {
        category.services = category.services.filter((svc) => svc.id !== serviceId);
        toast.success("Service removed successfully!");
      } else {
        toast.error("Category not found!");
      }
    },
  },
});

export const { addCategory, addService, deleteCategory, deleteService } = categorySlice.actions;
export default categorySlice.reducer;
