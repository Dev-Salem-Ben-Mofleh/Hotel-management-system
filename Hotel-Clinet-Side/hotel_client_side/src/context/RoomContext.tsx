import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import type { RoomDto, RoomTypeDto } from "../utils/AllInterfaces";

type RoomContextType = {
  roomsToMove: RoomDto[];
  setRooms: (rooms: RoomDto[]) => void;
  count: number;
  setCount: (count: number) => void;
  roomType: RoomTypeDto | null;
  setRoomType: (roomType: RoomTypeDto | null) => void;
};

const RoomContext = createContext<RoomContextType | null>(null);

type RoomProviderProps = {
  children: ReactNode;
};

function RoomProvider({ children }: RoomProviderProps) {
  const [roomsToMove = [], setRooms] = useState<RoomDto[]>();
  const [count, setCount] = useState<number>(0);
  const [roomType, setRoomType] = useState<RoomTypeDto | null>(null);

  return (
    <RoomContext.Provider
      value={{ roomsToMove, setRooms, setCount, count, roomType, setRoomType }}
    >
      {children}
    </RoomContext.Provider>
  );
}

function useRoomMove() {
  const context = useContext(RoomContext);
  if (context === null) {
    throw new Error("useRoomMove must be used within a RoomProvider");
  }
  return context;
}

export { RoomProvider, useRoomMove };
