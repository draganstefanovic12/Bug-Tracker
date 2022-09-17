import { Ticket } from "../../types/types";
import { RootState } from "../store/store";
import { createSlice } from "@reduxjs/toolkit";

export type TicketState = {
  tickets: Ticket[];
  error?: string | undefined;
  state?: string;
};

const initialState = {
  tickets: [],
} as unknown as TicketState;

export const ticketSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
});

export const tickets = (tickets: RootState) => tickets;
export default ticketSlice.reducer;
