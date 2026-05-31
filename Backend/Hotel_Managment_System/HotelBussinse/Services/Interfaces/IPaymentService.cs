using HotelBussinse.DTOs.Payment;

namespace HotelBussinse.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<IEnumerable<PaymentDto>> GetAllAsync();
        Task<PaymentDto> GetByIdAsync(int id);
        Task<PaymentDto> AddAsync(CreateOrUpdatePaymentDto paymentDto);
        Task<PaymentDto> UpdateAsync(int id, CreateOrUpdatePaymentDto paymentDto);
        Task<bool> DeleteAsync(int id);
        Task<int> Count(string? column, string? value, string? Operations);
        Task<bool> ExistsAsync(int id);
        Task<IEnumerable<PaymentDto>> PagerPaymentsUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations);

    }
}
