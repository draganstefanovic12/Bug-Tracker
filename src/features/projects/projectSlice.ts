import axios from "axios";
import { RootState } from "../store/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProjectState = {
  projects: Project[];
  error?: string | undefined;
  state: string;
};

const initialState = {
  projects: [],
} as unknown as ProjectState;

export type Project = {
  name: string;
  issues?: [];
  assigned?: string[];
  link: string;
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
        //Im not sure how to type this now, getting weird erros. check later
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

export const projects = (projects: RootState) => projects.projects;
export default projectSlice.reducer;
