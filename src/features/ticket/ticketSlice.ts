import axios from "../axios/interceptors";
import { Ticket } from "../../types/types";
import { RootState } from "../store/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const link = "https://drg-bug-tracker.herokuapp.com";

export type TicketState = {
  tickets: Ticket[];
  error?: string | undefined;
  state?: string;
};

const initialState = {
  tickets: [],
} as unknown as TicketState;

export const ticketAsync = createAsyncThunk(
  "tickets/new",
  async (ticket: Ticket) => {
    try {
      const response = await axios(`${link}/projects/ticket`, {
        method: "POST",
        data: {
          ticket: ticket,
          proj: ticket.project,
        },
      });
      return response.data;
    } catch (err: any) {
      const response = err.response.data.message;
      throw response;
    }
  }
);

export const ticketSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ticketAsync.pending, (ticket) => {
        return { ...ticket, state: "pending", error: undefined };
      })
      .addCase(
        ticketAsync.fulfilled,
        //Im not sure how to type this now, getting weird erros. check later <--
        (ticket, action: PayloadAction<any>) => {
          return {
            ...ticket,
            projects: [...ticket.tickets, action.payload],
            state: "fulfilled",
          };
        }
      )
      .addCase(ticketAsync.rejected, (ticket, action) => {
        return { ...ticket, error: action.error.message, state: "rejected" };
      });
  },
});

export const tickets = (tickets: RootState) => tickets;
export default ticketSlice.reducer;
