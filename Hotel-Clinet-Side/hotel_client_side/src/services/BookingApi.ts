import type { CreateBookingDto } from "../utils/AllInterfaces";
import { BASE_URL } from "../utils/constants";
import fetchData from "./Fetch";

export async function createBooking(newBooking: CreateBookingDto) {
  const response = await fetchData<CreateBookingDto>(
    `${BASE_URL}Booking/AddBooking`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    }
  );
  return response;
}
