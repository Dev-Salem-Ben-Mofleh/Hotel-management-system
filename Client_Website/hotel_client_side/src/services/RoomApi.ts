import type { MyRoomDataType } from "../utils/AllInterfaces";
import { BASE_URL } from "../utils/constants";
import fetchData from "./Fetch";

export async function searchRoom(
  PageNumber: number,
  Pagesize: number = 3,
  roomType: string,
  checkIn: string,
  checkOut: string,
  GuestNumber: number
) {
  const data = (await fetchData)<MyRoomDataType>(
    `${BASE_URL}Room/SearchAvailableRooms/${PageNumber}/${Pagesize}/${roomType}/${checkIn}/${checkOut}/${GuestNumber}`
  );
  return data;
}
