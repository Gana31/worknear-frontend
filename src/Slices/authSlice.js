import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
  accessToken: localStorage.getItem("accessToken") ? localStorage.getItem("accessToken"): false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoginData(state, action) {
        const {user,accessToken} = action.payload;
      state.user = user;
      state.accessToken =accessToken;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    updateUser(state, action) {
      const user = action.payload;
    state.user = user;
  },
  },
});

export const { setLoginData, setLoading,updateUser } = authSlice.actions;

export default authSlice.reducer;