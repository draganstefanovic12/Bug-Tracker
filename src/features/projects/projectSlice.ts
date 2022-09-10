import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type ProjectState = {
  projects: [];
  error?: string | undefined;
  state: string;
};

const initialState = {
  projects: [],
} as ProjectState;

type Project = {
  name: string;
  issues?: [];
  assigned?: [];
};

export const projectAsync = createAsyncThunk(
  "projects/new",
  async (project: Project) => {
    try {
      const response = await axios("api/projects/new", {
        method: "POST",
        data: project,
      });
      return response;
    } catch (err: any) {
      const response = err.response.data.message;
      throw response;
    }
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(projectAsync.pending, (project) => {
        return { ...project, state: "pending", error: undefined };
      })
      .addCase(
        projectAsync.fulfilled,
        (project, action: PayloadAction<any>) => {
          return {
            ...project,
            projects: action.payload.projects,
            state: "fulfilled",
          };
        }
      )
      .addCase(projectAsync.rejected, (project, action) => {
        return { ...project, error: action.error.message, state: "rejected" };
      });
  },
});
