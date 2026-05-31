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
    public interface IPaymentRepositry : IGenericRepository<Payment>
    {
        Task<bool> ExistsAsync(int id);
        Task<Payment> GetByBookingIdAsync(int id);

        Task<IEnumerable<Payment>> PagerPaymentsUsingPageNumber(short pageNumber, int pageSize, Expression<Func<Payment, bool>> predicate);

    }
}
