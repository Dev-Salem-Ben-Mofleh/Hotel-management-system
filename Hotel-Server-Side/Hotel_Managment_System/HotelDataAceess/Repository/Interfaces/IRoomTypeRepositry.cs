using HotelDataAceess.Entiteis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HotelDataAceess.Repository.Interfaces
{
    public interface IRoomTypeRepositry: IGenericRepository<RoomType>
    {
        Task<bool> ExistsAsync(int id);
        Task<bool> ExistsRoomTypeByRoomTypeTitleAsync(string RoomTypeTitle);
        Task<IEnumerable<RoomType>> PagerRoomTypeUsingPageNumber(short pageNumber, int pageSize, Expression<Func<RoomType, bool>> predicate);
    }
}
