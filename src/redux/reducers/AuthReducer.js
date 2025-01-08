import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "User",
  initialState: {
    userLoggedIn: false,
    userData: null,
  },
  reducers: {
    signIn: (state, action) => {
      state.userLoggedIn = true;
      state.userData = action.payload.user_data;
    },
    logout: (state) => {
      state.userLoggedIn = false;
      state.userData = null;
      state.token = null;
    },
  },
});

//Actions
export const { signIn, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
