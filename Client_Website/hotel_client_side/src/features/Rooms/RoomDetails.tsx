import { useRoomMove } from "../../context/RoomContext";
import type { RoomID } from "../../utils/AllInterfaces";

function RoomDetails({ roomId }: RoomID) {
  const { roomsToMove, roomType } = useRoomMove();
  const myRoom = roomsToMove.find((r) => r.roomId === roomId);
  return (
    <div className="p-6">
      <img
        src={
          myRoom?.roomImageUrl ||
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=300&fit=crop"
        }
        alt="Deluxe Ocean View Suite"
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        {roomType?.roomTypeTitle} Suite
      </h2>

      <div className="mb-4">
        <span className="text-4xl font-bold text-blue-600">
          ${roomType?.roomTypePricePerNight}
        </span>
        <span className="text-gray-500 ml-2">per night</span>
      </div>

      <p className="text-gray-600 mb-6">
        {roomType?.roomTypeDescription
          ? roomType.roomTypeDescription
          : "Elegant suite with breathtaking ocean views, featuring modern amenities and luxurious furnishings for the perfect getaway."}
      </p>

      {/* Room Features */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Room Features
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            <span>room Capacity = {roomType?.roomTypeCapacity}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            <span>Ocean View Balcony</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            <span>Private Bathroom</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            <span>Mini Bar</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            <span>Free WiFi</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            <span>Room Service</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
