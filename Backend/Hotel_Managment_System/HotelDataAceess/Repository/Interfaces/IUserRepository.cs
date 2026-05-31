using HotelDataAceess.Entiteis.Authentication;
using System.Linq.Expressions;

namespace HotelDataAceess.Repository.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<bool> ExistsAsync(int id);
        Task<bool> ExistsByEmailAsync(string email);
        Task<IEnumerable<User>> PagerUsersUsingPageNumber(short pageNumber, int pageSize, Expression<Func<User, bool>> predicate);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByIdAsync(int id);
    }
}
