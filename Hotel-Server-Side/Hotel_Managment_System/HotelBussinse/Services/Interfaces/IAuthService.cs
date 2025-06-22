using HotelBussinse.DTOs.Auth;
using HotelDataAceess.Entiteis.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Interfaces
{
    public interface IAuthService
    {
        Task<UserDto> RegisterAsync(CreateOrUpdateUserDto userDto);
        Task<(string accessToken, string refreshToken)> SignIn(string email, string password);
        Task<(string newAccessToken, string newRefreshToken)> RefreshTokenAsync(string oldRefreshToken);
        Task<bool> LogOut(string RefreshToken);
    }
}
