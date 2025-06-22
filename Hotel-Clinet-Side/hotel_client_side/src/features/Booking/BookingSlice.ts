import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateBookingDto } from "../../utils/AllInterfaces";
import { createBooking } from "../../services/BookingApi";

export const addBooking = createAsyncThunk(
  "bookings/AddBooking",
  async (newBooking: CreateBookingDto) => {
    const response = await createBooking(newBooking);
    return response;
  }
);
const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    booking: {},
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addBooking.fulfilled, (state, action) => {
      state.booking = action.payload;
    });
  },
});

export default bookingSlice.reducer;
