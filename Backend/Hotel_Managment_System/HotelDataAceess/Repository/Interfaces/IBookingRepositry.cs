using HotelDataAceess.Entiteis;
using HotelDataAceess.Entiteis.Views;
using System.Linq.Expressions;

namespace HotelDataAceess.Repository.Interfaces
{
    public interface IBookingRepositry : IGenericRepository<Booking>
    {
        Task<bool> ExistsAsync(int id);
        Task<IEnumerable<BookingView>> GetAllBooking();
        Task<IEnumerable<BookingView>> PagerBookingUsingPageNumber(short pageNumber, int pageSize, Expression<Func<BookingView, bool>> predicate);
        Task<bool> UpdateBookingStatus(int id, short Status);
        Task<IEnumerable<BookingView>> GetAllBookingByPersonID(int id);
        Task<int> CountBooking(Expression<Func<BookingView, bool>>? predicate = null);
        Task<IEnumerable<BookingView>> SearchBookingUsingDate(short pageNumber, int pageSize, DateTime from, DateTime to);
        Task<int> CountBookingByDate(DateTime from, DateTime to);
        Task<decimal> GetDailyRevenue();




    }
}
