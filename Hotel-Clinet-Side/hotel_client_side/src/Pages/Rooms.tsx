import { useRoomMove } from "../context/RoomContext";
import Pagination from "../ui/Pagination";
import ListRooms from "../features/Rooms/ListRooms";

function Rooms() {
  const { roomsToMove, count, roomType } = useRoomMove();

  if (!roomsToMove.length && !roomType)
    return (
      <span className="block text-lg font-medium text-gray-700 my-16 text-center ">
        No rooms available in that date
      </span>
    );
  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-yellow-50"
      id="rooms"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-700 mb-6">
            Discover Our {roomType?.roomTypeTitle} Rooms
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from a variety of rooms designed specifically for your
            comfort and memorable stay
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomsToMove.map((rooms) => (
            <ListRooms
              roomId={rooms.roomId}
              img={rooms?.roomImageUrl}
              roomTypePricePerNight={roomType?.roomTypePricePerNight}
              roomNumber={rooms?.roomNumber}
              additionalNotes={rooms?.additionalNotes}
              key={rooms.roomId}
            />
          ))}
        </div>
        <Pagination count={count} />
      </div>
    </section>
  );
}

export default Rooms;
