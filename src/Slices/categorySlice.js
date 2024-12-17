import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    editCategory: (state, action) => {
      const { categoryId, newName } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.name = newName;
      }
    },
  },
});

export const {
  setCategories,
  setLoading,
  setError,
  addCategory,
  deleteCategory,
  editCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
