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
    public class RoomTypeRepositry(HotelDbContext dbContext) : GenericRepository<RoomType>(dbContext), IRoomTypeRepositry
    {
        private readonly HotelDbContext _dbContext = dbContext;
        public async Task<bool> ExistsAsync(int id) => await _dbContext.Set<RoomType>().AnyAsync(x => x.RoomTypeId == id);
        public async Task<bool> ExistsRoomTypeByRoomTypeTitleAsync(string RoomTypeTitle)=> await _dbContext.Set<RoomType>().AnyAsync(x => x.RoomTypeTitle == RoomTypeTitle);

        public async Task<IEnumerable<RoomType>> PagerRoomTypeUsingPageNumber(short pageNumber, int pageSize, Expression<Func<RoomType, bool>> predicate)
        {
            var query = _dbContext.Set<RoomType>().AsQueryable();

            if (predicate != null)
                query = query.Where(predicate);

            return await query
                          .Skip((pageNumber - 1) * pageSize)
                          .Take(pageSize)
                          .OrderByDescending(r => r.RoomTypeId)
                          .AsNoTracking()
                          .ToListAsync();


        }

    }
}
