using HotelDataAceess.Data;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Entiteis.Views;
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
    public class PaymentRepositry(HotelDbContext dbContext) : GenericRepository<Payment>(dbContext),IPaymentRepositry
    {
        private readonly HotelDbContext _dbContext = dbContext;
        public async Task<bool> ExistsAsync(int id) => await _dbContext.Set<Payment>().AnyAsync(x => x.PaymentId == id);
        public async Task<Payment> GetByBookingIdAsync(int id) => await _dbContext.Set<Payment>().FirstOrDefaultAsync(p => p.BookingId == id);
        public async Task<IEnumerable<Payment>> PagerPaymentsUsingPageNumber(short pageNumber, int pageSize, Expression<Func<Payment, bool>> predicate)
        {
            var query = _dbContext.Set<Payment>().AsQueryable();

            if (predicate != null)
                query = query.Where(predicate);

            return await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .AsNoTracking()
                            .ToListAsync();


        }

    }
}
