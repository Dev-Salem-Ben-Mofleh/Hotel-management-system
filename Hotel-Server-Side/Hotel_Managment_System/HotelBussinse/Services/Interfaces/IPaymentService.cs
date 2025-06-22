using HotelBussinse.DTOs.Booking;
using HotelBussinse.DTOs.DTOViews;
using HotelBussinse.DTOs.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<IEnumerable<PaymentDto>> GetAllAsync();
        Task<PaymentDto> GetByIdAsync(int id);
        Task<PaymentDto> AddAsync(CreateOrUpdatePaymentDto paymentDto);
        Task<PaymentDto> UpdateAsync(int id, CreateOrUpdatePaymentDto paymentDto);
        Task<bool> DeleteAsync(int id);
        Task<int> Count();
        Task<bool> ExistsAsync(int id);
        Task<IEnumerable<PaymentDto>> PagerPaymentsUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations);

    }
}
