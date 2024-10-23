import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chat {
  _id: string;
  role: string;
  content: string;
}

interface UserType {
  id: string; // Mongoose generates this field
  name: string; // User's name
  email: string; // User's email
  chats: Chat[]; // Array of chat objects
  loggedIn: boolean; // Timestamp when user was last updated (automatically added by Mongoose)
}
const initialState: UserType = {
  id: "",
  name: "",
  email: "",
  chats: [],
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        email: string;
        chats: [];
      }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.chats = action.payload.chats;
      state.loggedIn = true;
    },
    // Action to log out the user
    logout: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.chats = [];
      state.loggedIn = false;
    },
  },
});

// Export the actions
export const { login, logout } = userSlice.actions;

// Export the reducer
const userReducer = userSlice.reducer;
export default userReducer;
