using HotelBussinse.DTOs.Countries;

namespace HotelBussinse.Services.Interfaces
{
    public interface ICountryService
    {
        Task<IEnumerable<CountryDto>> GetAllAsync();
        Task<CountryDto> GetByIdAsync(int id);
        Task<CountryDto> AddAsync(CreateOrUpdateCountryDto countryDto);
        Task<CountryDto> UpdateAsync(int id, CreateOrUpdateCountryDto countryDto);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}
