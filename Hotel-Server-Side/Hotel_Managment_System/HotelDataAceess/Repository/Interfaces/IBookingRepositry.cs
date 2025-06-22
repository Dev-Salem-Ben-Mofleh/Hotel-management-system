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
    public interface IBookingRepositry :IGenericRepository<Booking>
    {
        Task<bool> ExistsAsync(int id);
        Task<IEnumerable<BookingView>> GetAllBooking();
        Task<IEnumerable<BookingView>> PagerBookingUsingPageNumber(short pageNumber, int pageSize, Expression<Func<BookingView, bool>> predicate);
        Task<bool> UpdateBookingStatus(int id, short Status);
        Task<IEnumerable<BookingView>> GetAllBookingByPersonID(int id);


    }
}
