using HotelDataAceess.Entiteis;
using System.Linq.Expressions;

namespace HotelDataAceess.Repository.Interfaces
{
    public interface IRoomTypeRepositry : IGenericRepository<RoomType>
    {
        Task<bool> ExistsAsync(int id);
        Task<bool> ExistsRoomTypeByRoomTypeTitleAsync(string RoomTypeTitle);
        Task<IEnumerable<RoomType>> PagerRoomTypeUsingPageNumber(short pageNumber, int pageSize, Expression<Func<RoomType, bool>> predicate);
    }
}
