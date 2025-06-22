using HotelBussinse.DTOs.Room;
using HotelDataAceess.Entiteis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Interfaces
{
    public interface IRoomService
    {
        Task<IEnumerable<RoomDto>> GetAllAsync();
        Task<RoomDto> GetByIdAsync(int id);
        Task<RoomDto> AddAsync(CreateOrUpdateRoomDto roomDto);
        Task<RoomDto> UpdateAsync(int id, CreateOrUpdateRoomDto roomDto);
        Task<bool> DeleteAsync(int id);
        Task<int> Count();
        Task<bool> ExistsAsync(int id);
        Task<IEnumerable<RoomDto>> PagerRoomUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations);
        Task<bool> UpdateRoomAvailabilityStatus(int id, short availabilityStatus);
        Task<(IEnumerable<RoomDto>, int count)> SearchAvailableRooms(short pageNumber, int pageSize, string roomType, DateTime checkIn, DateTime checkOut, short GuestNumber);

    }
}
