import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    isLoggedIn: false, 
    username: "", 
    _id: "", 
    isAdmin: false 
	},
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
			state.username = action.payload.username;
			state._id = action.payload._id;
			state.isAdmin = action.payload.isAdmin;
    },
    logout(state) {
      state.isLoggedIn = false;
			state.username = "";
			state._id = "";
			state.isAdmin = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
