using HotelDataAceess.Entiteis.Authentication;

namespace HotelBussinse.Services.Interfaces
{
    public interface IAuthRepositry
    {
        Task<User> RegisterAsync(User newUser);
        Task<(string accessToken, string refreshToken)> GetTokenAsync(string email, string password);
        Task<(string newAccessToken, string newRefreshToken)> RefreshTokenAsync(string oldRefreshToken);
        Task<bool> RevokeTokenAsync(string RefreshToken);
    }
}
