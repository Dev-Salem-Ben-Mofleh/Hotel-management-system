using HotelBussinse.DTOs.Persons;

namespace HotelBussinse.Services.Interfaces
{
    public interface IPersonService
    {
        Task<IEnumerable<PersonDto>> GetAllPersonAsync();
        Task<PersonDto> GetByIdAsync(int id);
        Task<PersonDto> AddAsync(CreateOrUpdatePersonDto personDto);
        Task<PersonDto> UpdateAsync(int id, CreateOrUpdatePersonDto personDto);
        Task<bool> DeleteAsync(int id);
        Task<int> Count(string? column, string? value, string? Operations);
        Task<bool> ExistsAsync(int id);
        Task<IEnumerable<PersonDto>> PagerPersonsUsingPageNumber(short pageNumber, int pageSize, string? column, string? value, string? Operations);
        Task<PersonDto> GetPersonByNameAsync(string Name);

    }
}
