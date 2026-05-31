import { useEffect } from "react";
import { useRoomMove } from "../context/RoomContext";
import BookingForm from "../features/Booking/BookingForm";
import RoomDetails from "../features/Rooms/RoomDetails";
import type { RoomDto, RoomTypeDto } from "../utils/AllInterfaces";
import { useParams } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";

function CreateBooking() {
  useScrollToTop();
  const { roomId: roomId } = useParams();
  const { roomsToMove, roomType, setRoomType, setRooms } = useRoomMove();
  useEffect(() => {
    let myroomType: RoomTypeDto;
    let Rooms: RoomDto[];
    if (!roomType?.roomTypeId) {
      const savedData = localStorage.getItem("myRoomType");
      myroomType = savedData ? JSON.parse(savedData) : roomType;
      setRoomType(myroomType);
    }
    if (!roomsToMove.length) {
      const savedData = localStorage.getItem("rooms");
      Rooms = savedData ? JSON.parse(savedData) : roomsToMove;
      setRooms(Rooms);
    }
  }, [roomType, roomsToMove]);

  return (
    <div className="min-h-screen bg-gray-100 mt-[65px]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <RoomDetails roomId={Number(roomId)} />
            <BookingForm roomId={Number(roomId)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBooking;
