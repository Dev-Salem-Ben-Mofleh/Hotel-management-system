using HotelBussinse.DTOs.Room;

namespace HotelBussinse.Services.Interfaces
{
    public interface IRoomService
    {
        Task<IEnumerable<RoomDto>> GetAllAsync();
        Task<RoomDto> GetByIdAsync(int id);
        Task<RoomDto> AddAsync(CreateOrUpdateRoomDto roomDto);
        Task<RoomDto> UpdateAsync(int id, CreateOrUpdateRoomDto roomDto);
        Task<bool> DeleteAsync(int id);
        Task<int> Count(string? column, string? value, string? Operations);
        Task<bool> ExistsAsync(int id);
        Task<bool> ExistsByNumberRoomAsync(string roomNumber, int roomId);
        Task<bool> IsRoomAvailable(int bookingID, int id, DateTime checkIn, DateTime checkOut);
        Task<bool> IsRoomAvailableByAvailabilityStatus(int roomId);
        Task<IEnumerable<RoomDto>> PagerRoomUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations);
        Task<bool> UpdateRoomAvailabilityStatus(int id, short availabilityStatus);
        Task<(IEnumerable<RoomDto>, int count)> SearchAvailableRooms(short pageNumber, int pageSize, string roomType, DateTime checkIn, DateTime checkOut, short GuestNumber);
        Task<int> GetCountActiveRoom();
    }
}
