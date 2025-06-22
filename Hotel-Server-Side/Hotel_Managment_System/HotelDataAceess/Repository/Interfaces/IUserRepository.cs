using HotelDataAceess.Entiteis;
using HotelDataAceess.Entiteis.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HotelDataAceess.Repository.Interfaces
{
    public interface IUserRepository:IGenericRepository<User>
    {
        Task<bool> ExistsAsync(int id);
        Task<bool> ExistsByEmailAsync(string email);
        Task<IEnumerable<User>> PagerUsersUsingPageNumber(short pageNumber, int pageSize, Expression<Func<User, bool>> predicate);
        Task<User> GetUserByEmailAsync(string email);
    }
}
