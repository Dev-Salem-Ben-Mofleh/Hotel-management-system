import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { searchRoom } from "../../services/RoomApi";
import { PAGE_SIZE } from "../../utils/constants";
import type { MyRoomDataType } from "../../utils/AllInterfaces";

export function useSearchRoom() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const roomType: string = searchParams.get("roomType") || "";
  const checkIn: string = searchParams.get("checkIn") || "";
  const checkOut: string = searchParams.get("checkOut") || "";
  const GuestNumber: number = Number(searchParams.get("guests")) || 4;

  let shouldFetchRooms: boolean = true;
  if (roomType === "" || checkIn === "" || checkOut === "") {
    shouldFetchRooms = false;
  }

  const page = Number(searchParams.get("page")) || 1;
  const {
    isLoading,
    data = [],
    error,
  } = useQuery({
    queryKey: [
      "rooms",
      page,
      PAGE_SIZE,
      roomType,
      checkIn,
      checkOut,
      GuestNumber,
    ],
    queryFn: () =>
      searchRoom(page, PAGE_SIZE, roomType, checkIn, checkOut, GuestNumber),
    enabled: shouldFetchRooms,
  });

  const { rooms, countRooms = 0 } = data as MyRoomDataType;

  useEffect(() => {
    if (page < Math.ceil(countRooms / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: [
          "rooms",
          page + 1,
          PAGE_SIZE,
          roomType,
          checkIn,
          checkOut,
          GuestNumber,
        ],
        queryFn: () =>
          searchRoom(
            page + 1,
            PAGE_SIZE,
            roomType,
            checkIn,
            checkOut,
            GuestNumber
          ),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "rooms",
          page - 1,
          PAGE_SIZE,
          roomType,
          checkIn,
          checkOut,
          GuestNumber,
        ],
        queryFn: () =>
          searchRoom(
            page - 1,
            PAGE_SIZE,
            roomType,
            checkIn,
            checkOut,
            GuestNumber
          ),
      });
    }
  }, [page, roomType, checkIn, checkOut, GuestNumber, countRooms, queryClient]);

  return { isLoading, error, rooms, countRooms };
}
