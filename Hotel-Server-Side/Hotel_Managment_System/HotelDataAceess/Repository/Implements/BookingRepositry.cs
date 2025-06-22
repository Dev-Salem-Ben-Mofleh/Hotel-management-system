using HotelDataAceess.Data;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Entiteis.Views;
using HotelDataAceess.Enums;
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
    public class BookingRepositry(HotelDbContext dbContext) : GenericRepository<Booking>(dbContext), IBookingRepositry
    {
        private readonly HotelDbContext _dbContext = dbContext;
        public async Task<bool> ExistsAsync(int id) => await _dbContext.Set<Booking>().AnyAsync(x => x.BookingId == id);
        public async Task<IEnumerable<BookingView>> GetAllBooking() => await _dbContext.Set<BookingView>().AsNoTracking().ToListAsync();
        public async Task<IEnumerable<BookingView>> PagerBookingUsingPageNumber(short pageNumber, int pageSize, Expression<Func<BookingView, bool>> predicate)
        {
            var query = _dbContext.Set<BookingView>().AsQueryable();

            if (predicate != null)
                query = query.Where(predicate);

            return await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .OrderByDescending(b => b.BookingId)
                            .AsNoTracking()
                            .ToListAsync();

                            

        }
        public async Task<bool> UpdateBookingStatus(int id, short Status)
        {
            try
            {
                var Booking = await _dbContext.Set<Booking>().FirstOrDefaultAsync(x => x.BookingId == id);
                if(Booking == null)
                {
                     throw new KeyNotFoundException("The Booking is not found");
                }

                Booking.Status = (Statues)Status;
                _dbContext.Set<Booking>().Update(Booking);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateException dbEx)
            {
                throw new Exception($"Database update failed: {dbEx.InnerException?.Message ?? dbEx.Message}", dbEx);
            }
            catch (Exception ex)
            {
                throw new Exception($"An unexpected error occurred while updating Booking with ID {id}: {ex.Message}", ex);
            }

        }
        public async Task<IEnumerable<BookingView>> GetAllBookingByPersonID(int id) 
            {
            var bookings = await _dbContext.Set<Booking>()
                .Where(x => x.PersonId == id)
                .AsNoTracking()
                .Include(x => x.Person)
                .Include(x => x.Room)
                .OrderByDescending(x => x.BookingId)
                .ToListAsync();

            var bookingViews = bookings.Select(b => new BookingView
            {
                FullName = b.Person.FullName,
                CheckInDate = b.CheckInDate,
                CheckOutDate = b.CheckOutDate,
                RoomNumber = b.Room.RoomNumber,
                Status = b.Status.ToString(),
            }).ToList();

            return bookingViews;

        }
    }
}
