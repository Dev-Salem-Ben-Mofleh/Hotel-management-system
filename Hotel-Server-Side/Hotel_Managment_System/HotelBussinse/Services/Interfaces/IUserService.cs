using HotelBussinse.DTOs.Auth;
using HotelBussinse.DTOs.Persons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetByIdAsync(int id);
        Task<UserDto> AddAsync(CreateOrUpdateUserDto userDto);
        Task<UserDto> UpdateAsync(int id, CreateOrUpdateUserDto userDto);
        Task<bool> DeleteAsync(int id);
        Task<int> Count();
        Task<bool> ExistsAsync(int id);
        Task<bool> ExistsByEmailAsync(string email);
        Task<IEnumerable<UserDto>> PagerUsersUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations);
        Task<UserDto> GetUserByEmailAsync(string email);

    }
}
