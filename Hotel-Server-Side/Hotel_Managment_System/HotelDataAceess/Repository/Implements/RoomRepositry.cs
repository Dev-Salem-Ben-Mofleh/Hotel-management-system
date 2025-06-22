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
    public class RoomRepositry(HotelDbContext dbContext) : GenericRepository<Room>(dbContext), IRoomRepositry
    {
        private readonly HotelDbContext _dbContext = dbContext;
        public async Task<bool> ExistsAsync(int id) => await _dbContext.Set<Room>().AnyAsync(x => x.RoomId == id);
        public async Task<bool> ExistsByNumberRoomAsync(string NumberRoom) => await _dbContext.Set<Room>().AnyAsync(x => x.RoomNumber == NumberRoom);
        public async Task<IEnumerable<Room>> PagerRoomUsingPageNumber(short pageNumber, int pageSize, Expression<Func<Room, bool>> predicate)
        {
            var query = _dbContext.Set<Room>().AsQueryable();

            if (predicate != null)
                query = query.Where(predicate);

            return await query
                          .Skip((pageNumber - 1) * pageSize)
                          .Take(pageSize)
                          .OrderByDescending(r => r.RoomId)
                          .AsNoTracking()
                          .ToListAsync();


        }
        public async Task<bool> UpdateRoomAvailabilityStatus(int id, short availabilityStatus)
        {
            try
            {
                var Room = await _dbContext.Set<Room>().FirstOrDefaultAsync(x => x.RoomId == id);
                if (Room == null)
                {
                    throw new KeyNotFoundException("The Room is not found");
                }

                Room.AvailabilityStatus = (AvailabilityStatus)availabilityStatus;
                _dbContext.Set<Room>().Update(Room);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateException dbEx)
            {
                throw new Exception($"Database update failed: {dbEx.InnerException?.Message ?? dbEx.Message}", dbEx);
            }
            catch (Exception ex)
            {
                throw new Exception($"An unexpected error occurred while updating Room with ID {id}: {ex.Message}", ex);
            }

        }
        public async Task<bool> IsRoomAvailable(int bookingID ,int id, DateTime checkIn, DateTime checkOut)
        {
            try
            {
                var query = _dbContext.Set<Room>().AsQueryable();
                bool IsAvailable;
                if (bookingID == 0)
                {
                    IsAvailable = await _dbContext.Set<Room>()
                                   .Include(r => r.Bookings)
                                   .AnyAsync(r =>
                                       r.RoomId == id &&
                                       r.AvailabilityStatus == AvailabilityStatus.Available &&
                                      !r.Bookings.Any(b =>
                                        b.CheckInDate < checkOut && b.CheckOutDate > checkIn
                                    )
                                      );

                }
                else
                {

                     IsAvailable = await _dbContext.Set<Room>()
                                    .Include(r => r.Bookings)
                                    .AnyAsync(r =>
                                        r.RoomId == id &&
                                        r.AvailabilityStatus == AvailabilityStatus.Available &&
                                        r.Bookings.Any(b =>
                                              b.BookingId!= bookingID&&
                                             (checkIn < b.CheckInDate || checkIn > b.CheckOutDate) &&
                                             (checkOut < b.CheckInDate || checkOut > b.CheckOutDate)
                                           )
                                        );

                }
                return IsAvailable;
            }
            catch (DbUpdateException dbEx)
            {
                throw new Exception($"Database update failed: {dbEx.InnerException?.Message ?? dbEx.Message}", dbEx);
            }
            catch (Exception ex)
            {
                throw new Exception($"An unexpected error occurred while updating Room with ID {id}: {ex.Message}", ex);
            }

        }
        public async Task<(IEnumerable<Room>, int count)> SearchAvailableRooms(short pageNumber, int pageSize, string roomType, DateTime checkIn, DateTime checkOut, int GuestNumber)
        {


            var query = _dbContext.Set<Room>()
                                .Include(r => r.Bookings)
                                .Include(r => r.RoomType)
                                .Where(r =>
                                    r.AvailabilityStatus == AvailabilityStatus.Available &&
                                    r.RoomType.RoomTypeTitle == roomType &&
                                    r.RoomType.RoomTypeCapacity >= GuestNumber &&
                                   !r.Bookings.Any(b =>
                                         b.CheckInDate < checkOut && b.CheckOutDate > checkIn
                                     )
                                );


            var Room= await query
                          .Skip((pageNumber - 1) * pageSize)
                          .Take(pageSize)
                          .OrderByDescending(r => r.RoomId)
                          .AsNoTracking()
                          .ToListAsync();

            int count = await query.CountAsync();

            return (Room, count);
        }

    }
}
