import axios from "axios";
import { RootState } from "../../store/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = UserFullfilled | null;

export type UserFullfilled = {
  username?: string;
  token?: string;
  error?: string | undefined;
  state?: string;
};

type ThunkUser = {
  username: string;
  password: string;
  email?: string;
  api: "login" | "register";
};

const initialState = null as UserState;
//Can login or register a user since both calls are really similar
//Using api
export const actionAsync = createAsyncThunk(
  "user/action",
  async (user: ThunkUser) => {
    try {
      const response = await axios(`api/users/${user.api}`, {
        method: "POST",
        data: {
          username: user.username,
          password: user.password,
          email: user.email,
        },
      });
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
    builder
      .addCase(actionAsync.pending, (user) => {
        return { ...user, state: "pending", error: undefined };
      })
      .addCase(
        actionAsync.fulfilled,
        (user, action: PayloadAction<UserFullfilled>) => {
          console.log(action);
          localStorage.setItem("BTUser", JSON.stringify(action.payload));
          return {
            ...user,
            username: action.payload.username,
            token: action.payload.token,
            state: "fulfilled",
            error: undefined,
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
