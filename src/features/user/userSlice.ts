import axios from "axios";
import { RootState } from "../store/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = UserFulfilled | null;

type ThunkUser = {
  username: string;
  password: string;
  email?: string;
  role?: string;
  api: "login" | "register";
};

export type UserFulfilled = {
  username?: string;
  token?: string;
  error?: string | undefined;
  state?: string;
  role?: string;
  notifications?: Notification[];
};

const initialState = null as UserState;
//Can login or register a user since both calls are really similar
export const actionAsync = createAsyncThunk(
  "user/action",
  async (user: ThunkUser) => {
    try {
      const response = await axios(
        `https://drg-bug-tracker.herokuapp.com/users/${user.api}`,
        {
          method: "POST",
          data: {
            username: user.username,
            password: user.password,
            email: user.email,
            role: user.role,
          },
        }
      );
      return response.data;
    } catch (err: any) {
      const response = err.response.data.message;
      throw response;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (user, action: PayloadAction<UserFulfilled>) => {
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
    builder
      .addCase(actionAsync.pending, (user) => {
        return { ...user, state: "pending", error: undefined };
      })
      .addCase(
        actionAsync.fulfilled,
        (user, action: PayloadAction<UserFulfilled>) => {
          localStorage.setItem("BTUser", JSON.stringify(action.payload));
          userSlice.actions.login(action.payload);
          return {
            ...user,
            username: action.payload.username,
            token: action.payload.token,
            state: "fulfilled",
            error: undefined,
            role: action.payload.role,
          };
        }
      )
      .addCase(actionAsync.rejected, (user, action) => {
        return { ...user, error: action.error.message, state: "failed" };
      });
  },
});

export const { login, logout } = userSlice.actions;
export const user = (user: RootState) => user.user;
export default userSlice.reducer;
