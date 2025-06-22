import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./features/Booking/BookingSlice";
const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});

export default store;
