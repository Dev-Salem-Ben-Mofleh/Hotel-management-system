using AutoMapper;
using HotelBussinse.DTOs.Auth;
using HotelBussinse.DTOs.Booking;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Entiteis.Authentication;
using HotelDataAceess.Repository.Implements;
using HotelDataAceess.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Implements
{
    public class AuthService(IAuthRepositry authRepository, IPersonRepository personRepository, IMapper mapper) : IAuthService
    {
        private readonly IAuthRepositry _authRepository = authRepository;
        private readonly IPersonRepository _personRepository = personRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<UserDto> RegisterAsync(CreateOrUpdateUserDto userDto)
        {
            bool isFound = await _personRepository.ExistsAsync(userDto.PersonId);
            if (!isFound)
                throw new ValidationException("The Person is not found");

            var NewUser = _mapper.Map<User>(userDto);
            var UserDetails = await _authRepository.RegisterAsync(NewUser);
            return _mapper.Map<UserDto>(UserDetails);

        }

        public async Task<(string accessToken, string refreshToken)> SignIn(string email, string password)
        {
             (string accessToken, string refreshToken) = await _authRepository.GetTokenAsync(email, password);

            return (accessToken,refreshToken);

        }

        public async Task<(string newAccessToken, string newRefreshToken)> RefreshTokenAsync(string oldRefreshToken)
        {
            (string newAccessToken, string newRefreshToken) = await _authRepository.RefreshTokenAsync(oldRefreshToken);

            return (newAccessToken, newRefreshToken);

        }
        public async Task<bool> LogOut(string RefreshToken) => await _authRepository.RevokeTokenAsync(RefreshToken);


    }

}
