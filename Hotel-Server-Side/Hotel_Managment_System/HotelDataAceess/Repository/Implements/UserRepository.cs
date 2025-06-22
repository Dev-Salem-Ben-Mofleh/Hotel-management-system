using HotelDataAceess.Data;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Entiteis.Authentication;
using HotelDataAceess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

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
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .Include(p => p.Person)
                            .OrderByDescending(p => p.UserId)
                            .AsNoTracking()
                            .ToListAsync();
        }
        public async Task<User> GetUserByEmailAsync(string email) => await _dbContext.Set<User>().AsNoTracking().
            FirstOrDefaultAsync(x => x.Email == email );

    }
}
