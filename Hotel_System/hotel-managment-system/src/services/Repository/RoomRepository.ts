import { BASE_URL } from "../../utils/constants";
import type { Room, RoomView } from "../models/Room";
import fetchData from "./FetchAPI";
import { GenericRepository } from "./GenericRepository";

export class RoomRepository extends GenericRepository<Room> {
  constructor(apiUrl: string = `${BASE_URL}/Room`) {
    super(apiUrl);
  }

  async getRoomUsingPageNumber(
    pageNumber: number,
    pageSize: number,
    column: string,
    value: string,
    Operations: string,
  ): Promise<RoomView[]> {
    const allRooms: RoomView[] = await fetchData<RoomView[]>(
      column !== "" && value !== "" && Operations !== ""
        ? `${this.apiUrl}/RoomUsingPageNumber/${pageNumber}/${pageSize}/${column}/${value}/${Operations}`
        : `${
            this.apiUrl
          }/RoomUsingPageNumber/${pageNumber}/${pageSize}/${null}/${null}/${null}`,
    );
    return allRooms;
  }

  async searchAvailableRooms(
    pageNumber: number,
    pageSize: number,
    roomType: string,
    checkIn: Date,
    checkOut: Date,
    GuestNumber: number,
  ): Promise<Room[]> {
    const allRooms: Room[] = await fetchData<Room[]>(
      `${this.apiUrl}/SearchAvailableRooms/${pageNumber}/${pageSize}/${roomType}/${checkIn}/${checkOut}/${GuestNumber}`,
    );
    return allRooms;
  }

  async existsRoom(id: number): Promise<boolean> {
    const result: boolean = await fetchData<boolean>(
      `${this.apiUrl}/ExistsRoom/${id}`,
    );
    return result;
  }

  async ExistsByRoomNumber(
    roomNumber: string,
    roomId: number,
  ): Promise<boolean> {
    const result: boolean = await fetchData<boolean>(
      `${this.apiUrl}/ExistsByRoomNumber/${roomNumber}/${roomId}`,
    );
    return result;
  }
  async IsRoomAvailable(
    bookingId: number,
    id: number,
    checkInDate: string,
    checkOutDate: string,
  ): Promise<boolean> {
    const result: boolean = await fetchData<boolean>(
      `${this.apiUrl}/IsRoomAvailable/${bookingId}/${id}/${checkInDate}/${checkOutDate}`,
    );
    return result;
  }

  async IsRoomAvailableByAvailabilityStatus(roomId: number): Promise<boolean> {
    const result: boolean = await fetchData<boolean>(
      `${this.apiUrl}/IsRoomAvailableByAvailabilityStatus/${roomId}`,
    );
    return result;
  }

  async GetCountActiveRoom(): Promise<number> {
    const result: number = await fetchData<number>(
      `${this.apiUrl}/GetCountActiveRoom`,
    );
    return result;
  }
}
