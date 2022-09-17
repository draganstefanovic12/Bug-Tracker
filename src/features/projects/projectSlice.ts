import { Project } from "../../types/types";
import { RootState } from "../store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProjectState = {
  projects: Project[];
  error?: string | undefined;
  state?: string;
};

const initialState = {
  projects: [],
} as unknown as ProjectState;

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project[]>) => {
      return {
        ...state,
        projects: action.payload,
      };
    },
  },
});

export const { addProject } = projectSlice.actions;
export const projects = (projects: RootState) => projects.projects;
export default projectSlice.reducer;
