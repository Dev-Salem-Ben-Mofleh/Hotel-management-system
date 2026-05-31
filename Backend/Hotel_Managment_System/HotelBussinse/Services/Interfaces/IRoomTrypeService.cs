using HotelBussinse.DTOs.RoomType;

namespace HotelBussinse.Services.Interfaces
{
    public interface IRoomTrypeService
    {
        Task<IEnumerable<RoomTypeDto>> GetAllAsync();
        Task<RoomTypeDto> GetByIdAsync(int id);
        Task<IEnumerable<RoomTypeDto>> PagerRoomTypeUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations);
        Task<RoomTypeDto> AddAsync(CreateOrUpdateRoomTypeDto roomtypeDto);
        Task<RoomTypeDto> UpdateAsync(int id, CreateOrUpdateRoomTypeDto roomtypeDto);
        Task<bool> DeleteAsync(int id);
        Task<int> Count(string? column, string? value, string? Operations);
        Task<bool> ExistsAsync(int id);
    }
}
