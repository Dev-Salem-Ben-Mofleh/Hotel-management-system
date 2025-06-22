using HotelBussinse.DTOs.Countries;
using HotelBussinse.DTOs.Persons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Interfaces
{
    public interface ICountryService
    {
        Task<IEnumerable<CountryDto>> GetAllAsync();
        Task<CountryDto> GetByIdAsync(int id);
        Task<CountryDto> AddAsync(CreateOrUpdateCountryDto countryDto);
        Task<CountryDto> UpdateAsync(int id, CreateOrUpdateCountryDto countryDto);
        Task<bool> DeleteAsync(int id);
        Task<int> Count();
        Task<bool> ExistsAsync(int id);
    }
}
