using HotelDataAceess.Data;
using HotelDataAceess.Entiteis.Authentication;
using HotelDataAceess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace HotelDataAceess.Repository.Implements
{
    public class UserRepository(HotelDbContext dbContext) : GenericRepository<User>(dbContext), IUserRepository
    {
        private readonly HotelDbContext _dbContext = dbContext;
        public async Task<bool> ExistsAsync(int id) => await _dbContext.Set<User>().AnyAsync(x => x.UserId == id);
        public async Task<bool> ExistsByEmailAsync(string Email) => await _dbContext.Set<User>().AnyAsync(x => x.Email == Email);
        public async Task<IEnumerable<User>> PagerUsersUsingPageNumber(short pageNumber, int pageSize, Expression<Func<User, bool>> predicate)
        {

            var query = _dbContext.Set<User>().AsQueryable();

            if (predicate != null)
                query = query.Where(predicate);

            return await query
                            .OrderByDescending(r => r.UserId)
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .Include(p => p.Person)
                            .AsNoTracking()
                            .ToListAsync();
        }
        public async Task<User> GetUserByEmailAsync(string email) => await _dbContext.Set<User>().AsNoTracking().Include(x => x.Person)
           .FirstOrDefaultAsync(x => x.Email == email);
        public async Task<User> GetUserByIdAsync(int id) => await _dbContext.Set<User>().AsNoTracking().Include(x => x.Person)
          .FirstOrDefaultAsync(x => x.UserId == id);




    }
}
