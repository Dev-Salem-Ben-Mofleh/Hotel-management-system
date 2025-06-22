using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Data;
using HotelDataAceess.Entiteis.Authentication;
using HotelDataAceess.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Implements
{
    public class AuthRepositry (HotelDbContext context, IOptions<JWT> jwtSettings) : IAuthRepositry
    {
        private readonly HotelDbContext _context= context;
        private readonly JWT _jwtSettings= jwtSettings.Value;


        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                  issuer: _jwtSettings.Issuer,
                  audience: _jwtSettings.Audience,
                  claims: claims,
                  expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
                  signingCredentials: creds
              );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private RefreshToken GenerateRefreshToken()
        {
            var randomNumber = new byte[32];

            using var generator = new RNGCryptoServiceProvider();

            generator.GetBytes(randomNumber);

            return new RefreshToken
            {
                Token = Convert.ToBase64String(randomNumber),
                ExpiresOn = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenExpiryDays),
                CreatedOn = DateTime.UtcNow
            };

        }

        public async Task<User> RegisterAsync(User newUser)
        {
            if (await _context.Users.AnyAsync(u => u.Email == newUser.Email))
                return null;

            var user = new User
            {
                Email = newUser.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password),
                Role = newUser.Role,
                PersonId= newUser.PersonId
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }
        
        public async Task<(string accessToken, string refreshToken)> GetTokenAsync(string email, string password)
        {
            var user = await _context.Users.Include(u => u.RefreshTokens).FirstOrDefaultAsync(u => u.Email == email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
                return (null, null);

            var existingToken = user.RefreshTokens.FirstOrDefault(rt => rt.IsActive);
            if (existingToken != null)
            {
                return (GenerateJwtToken(user), existingToken.Token);
            }

            await _context.RefreshTokens
            .Where(r => r.RevokedOn != null || r.ExpiresOn <= DateTime.UtcNow)
            .ExecuteDeleteAsync();

            var accessToken = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();
            refreshToken.UserId = user.UserId;

            user.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();

            return (accessToken, refreshToken.Token);
        }

        public async Task<(string newAccessToken, string newRefreshToken)> RefreshTokenAsync(string oldRefreshToken)
        {
            var token = await _context.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt =>
                    rt.Token == oldRefreshToken &&
                    rt.RevokedOn == null &&
                    rt.ExpiresOn > DateTime.UtcNow);

            if (token == null)
                return (null, null);


            var user = token.User;
            var newAccessToken = GenerateJwtToken(user);
            var newRefreshToken = GenerateRefreshToken();

            token.RevokedOn = DateTime.UtcNow;
            user.RefreshTokens.Add(newRefreshToken);

            await _context.SaveChangesAsync();
            return (newAccessToken, newRefreshToken.Token);
        }

        public async Task<bool> RevokeTokenAsync(string RefreshToken)
        {

            var refreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token == RefreshToken);
            if (refreshToken == null || !refreshToken.IsActive)
                return false;

            refreshToken.RevokedOn = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
