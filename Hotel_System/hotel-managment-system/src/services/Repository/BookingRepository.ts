import { BASE_URL } from "../../utils/constants";
import type { Booking, BookingView } from "../models/Booking";
import fetchData from "./FetchAPI";
import { GenericRepository } from "./GenericRepository";

export class BookingRepository extends GenericRepository<Booking> {
  constructor(apiUrl: string = `${BASE_URL}/Booking`) {
    super(apiUrl);
  }

  async getAllBookingsByPersonID(id: number): Promise<Booking[]> {
    const allBookings: Booking[] = await fetchData<Booking[]>(
      `${this.apiUrl}/AllBookingsByPersonID/${id}`,
    );
    return allBookings;
  }

  async getBookingUsingPageNumber(
    pageNumber: number,
    pageSize: number,
    column: string,
    value: string,
    Operations: string,
  ): Promise<BookingView[]> {
    const allBookings: BookingView[] = await fetchData<BookingView[]>(
      column !== "" && value !== "" && Operations !== ""
        ? `${this.apiUrl}/BookingUsingPageNumber/${pageNumber}/${pageSize}/${column}/${value}/${Operations}`
        : `${
            this.apiUrl
          }/BookingUsingPageNumber/${pageNumber}/${pageSize}/${null}/${null}/${null}`,
    );

    return allBookings;
  }

  async getBookingUsingDate(
    pageNumber: number,
    pageSize: number,
    from: string,
    to: string,
  ): Promise<BookingView[]> {
    const allBookings: BookingView[] = await fetchData<BookingView[]>(
      `${this.apiUrl}/SearchBookingUsingDate/${pageNumber}/${pageSize}/${from}/${to}`,
    );

    return allBookings;
  }

  async existsBooking(id: number): Promise<boolean> {
    const result: boolean = await fetchData<boolean>(
      `${this.apiUrl}/ExistsBooking/${id}`,
    );
    return result;
  }

  async updateBookingStatus(id: number, Status: string): Promise<boolean> {
    const result: boolean = await fetchData<boolean>(
      `${this.apiUrl}/UpdateBookingStatus/${id}/${Status}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      },
    );
    return result;
  }

  async getTheTotalPrice(
    RoomTypePricePerNight: number,
    CheckInDate: Date,
    CheckOutDate: Date,
  ): Promise<number> {
    const totalPrice: number = await fetchData<number>(
      `${this.apiUrl}/GetTheTotalPrice/${RoomTypePricePerNight}/${CheckInDate}/${CheckOutDate}`,
    );
    return totalPrice;
  }
  async countBookingByDate(from: string, to: string): Promise<number> {
    return await fetchData<number>(
      `${this.apiUrl}/CountBookingByDate/${from}/${to}`,
    );
  }

  async GetDailyRevenue(): Promise<number> {
    return await fetchData<number>(`${this.apiUrl}/GetDailyRevenue`);
  }
}
