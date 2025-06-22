import LinkButton from "../../ui/LinkButton";

type RoomData = {
  roomId: number | null;
  img: string | null;
  roomTypePricePerNight: number | undefined;
  roomNumber: string | null;
  additionalNotes: string | null;
};

function ListRooms({
  roomId,
  img,
  roomTypePricePerNight,
  roomNumber,
  additionalNotes,
}: RoomData) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
      <div className="relative overflow-hidden">
        <img
          src={
            img ||
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=300&fit=crop"
          }
          loading="lazy"
          alt="Standard Room"
          className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className="gradient-gold text-white font-semibold px-3 py-1 rounded-full">
            ${roomTypePricePerNight}/night
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full"></div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-yellow-700 mb-3">
          Number of room: {roomNumber}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {additionalNotes
            ? additionalNotes
            : "Comfortable room with all essential amenities"}
        </p>

        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-gray-700">Available Amenities:</h4>
          <div className="flex flex-wrap gap-2">
            <span className="border border-gray-300 text-xs px-2 py-1 rounded">
              Free WiFi
            </span>
            <span className="border border-gray-300 text-xs px-2 py-1 rounded">
              Air Conditioning
            </span>
            <span className="border border-gray-300 text-xs px-2 py-1 rounded">
              Television
            </span>
          </div>
        </div>
        <LinkButton to={`/ConfirmBooking/${roomId}`}>Book Now</LinkButton>
      </div>
    </div>
  );
}

export default ListRooms;
