using HotelBussinse.DTOs.Booking;
using HotelBussinse.DTOs.DTOViews;
using HotelBussinse.DTOs.Persons;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Entiteis.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Interfaces
{
    public interface IBookingService
    {
        Task<IEnumerable<BookingViewDto>> GetAllBookingAsync();
        Task<BookingDto> GetByIdAsync(int id);
        Task<BookingDto> AddAsync(CreateOrUpdateBookingDto bookingDto);
        Task<BookingDto> UpdateAsync(int id, CreateOrUpdateBookingDto bookingDto);
        Task<bool> DeleteAsync(int id);
        Task<int> Count();
        Task<bool> ExistsAsync(int id);
        Task<IEnumerable<BookingViewDto>> PagerBookingUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations);
        Task<bool> UpdateBookingStatus(int id,short Status);
        Task<IEnumerable<BookingViewDto>> GetAllBookingByPersonID(int id);

        Task<decimal> GetTheTotalPrice(decimal RoomTypePricePerNight, DateTime CheckInDate, DateTime CheckOutDate);


    }
}
