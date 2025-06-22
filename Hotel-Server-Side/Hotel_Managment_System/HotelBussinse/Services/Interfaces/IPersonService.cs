using HotelBussinse.DTOs.Persons;
using HotelDataAceess.Entiteis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Interfaces
{
    public interface IPersonService
    {
        Task<IEnumerable<PersonDto>> GetAllPersonAsync();
        Task<PersonDto> GetByIdAsync(int id);
        Task<PersonDto> AddAsync(CreateOrUpdatePersonDto personDto);
        Task<PersonDto> UpdateAsync(int id, CreateOrUpdatePersonDto personDto);
        Task<bool> DeleteAsync(int id);
        Task<int> Count();
        Task<bool> ExistsAsync(int id);
        Task<IEnumerable<PersonDto>> PagerPersonsUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations);
        Task<PersonDto> GetPersonByNameAsync(string Name);

    }
}
