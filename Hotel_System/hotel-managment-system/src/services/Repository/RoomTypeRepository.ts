import { BASE_URL } from "../../utils/constants";
import type { RoomType } from "../models/RoomType";
import fetchData from "./FetchAPI";
import { GenericRepository } from "./GenericRepository";

export class RoomTypeRepository extends GenericRepository<RoomType> {
  constructor(apiUrl: string = `${BASE_URL}/RoomType`) {
    super(apiUrl);
  }

  async GetRoomTypeUsingPageNumber(
    pageNumber: number,
    pageSize: number,
    column: string,
    value: string,
    Operations: string
  ): Promise<RoomType[]> {
    const allBookings: RoomType[] = await fetchData<RoomType[]>(
      column !== "" && value !== "" && Operations !== ""
        ? `${this.apiUrl}/RoomTypeUsingPageNumber/${pageNumber}/${pageSize}/${column}/${value}/${Operations}`
        : `${
            this.apiUrl
          }/RoomTypeUsingPageNumber/${pageNumber}/${pageSize}/${null}/${null}/${null}`
    );
    return allBookings;
  }

  async existsRoomType(id: number): Promise<boolean> {
    const result: boolean = await fetchData<boolean>(
      `${this.apiUrl}/ExistsRoomType/${id}`
    );
    return result;
  }
}
