using HotelDataAceess.Data;
using HotelDataAceess.Entiteis;
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

    public class PersonRepository(HotelDbContext dbContext):GenericRepository<Person>(dbContext), IPersonRepository
    {
        private readonly HotelDbContext _dbContext = dbContext;

        public async Task<bool> ExistsAsync(int id)=> await _dbContext.Set<Person>().AnyAsync(x=>x.PersonId==id);
        public async Task<IEnumerable<Person>> GetAllPersonAsync() => await _dbContext.Set<Person>().Include(p=>p.NationalityCountry).AsNoTracking().ToListAsync();
        public async Task<IEnumerable<Person>> PagerPersonsUsingPageNumber(short pageNumber, int pageSize, Expression<Func<Person, bool>> predicate)
        {
            var query = _dbContext.Set<Person>().AsQueryable();

            if (predicate != null)
                query = query.Where(predicate);

            return await query
                .Include(p => p.NationalityCountry)
                .OrderByDescending(p => p.PersonId)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .AsNoTracking()
                .ToListAsync();
        }
        public async Task<Person> GetPersonByNameAsync(string Name) => await _dbContext.Set<Person>().AsNoTracking().FirstOrDefaultAsync(x => x.FullName == Name);
    }
}
