import type { RoomTypeDto } from "../utils/AllInterfaces";
import { BASE_URL } from "../utils/constants";
import fetchData from "./Fetch";

export async function getAllRoomType() {
  const data = (await fetchData)<RoomTypeDto[]>(
    `${BASE_URL}RoomType/AllRoomTypes`
  );
  return data;
}
