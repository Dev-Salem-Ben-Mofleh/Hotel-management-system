using HotelDataAceess.Entiteis;
using HotelDataAceess.Entiteis.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HotelDataAceess.Repository.Interfaces
{
    public interface IRoomRepositry:IGenericRepository<Room>
    {
        Task<bool> ExistsAsync(int id);
        Task<bool> ExistsByNumberRoomAsync(string NumberRoom);
        Task<IEnumerable<Room>> PagerRoomUsingPageNumber(short pageNumber, int pageSize, Expression<Func<Room, bool>> predicate);
        Task<bool> UpdateRoomAvailabilityStatus(int id, short availabilityStatus);
        Task<(IEnumerable<Room>,int count)> SearchAvailableRooms(short pageNumber, int pageSize, string roomType, DateTime checkIn,DateTime checkOut,int GuestNumber);
        Task<bool> IsRoomAvailable(int bookingID , int id, DateTime checkIn, DateTime checkOut);

    }
}
