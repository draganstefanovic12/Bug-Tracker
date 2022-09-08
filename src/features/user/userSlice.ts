import axios from "axios";
import { RootState } from "../../store/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = UserFullfilled | null;

export type UserFullfilled = {
  username: string;
  token: string;
};

type ThunkUser = {
  username: string;
  password: string;
};

const initialState = null as UserState;

const loginLink = "api/users/login";
export const loginAsync = createAsyncThunk(
  "user/login",
  async (user: ThunkUser) => {
    try {
      const response = await axios(loginLink, {
        method: "POST",
        data: {
          username: user.username,
          password: user.password,
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (user, action: PayloadAction<UserFullfilled>) => {
      user = action.payload;
      return user;
    },
    logout: (user) => {
      user = null;
      localStorage.removeItem("BTUser");
      return user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {});
    builder.addCase(
      loginAsync.fulfilled,
      (user, action: PayloadAction<UserFullfilled>) => {
        user = action.payload;
        localStorage.setItem("BTUser", JSON.stringify(action.payload));
        return user;
      }
    );
    builder.addCase(loginAsync.rejected, (user, action) => {
      user = null;
    });
  },
});

export const { login, logout } = userSlice.actions;
export const user = (user: RootState) => user.user;
export default userSlice.reducer;
