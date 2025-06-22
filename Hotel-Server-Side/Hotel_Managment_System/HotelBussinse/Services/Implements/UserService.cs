using AutoMapper;
using HotelBussinse.DTOs.Auth;
using HotelBussinse.Global;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Entiteis.Authentication;
using HotelDataAceess.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Implements
{
    public class UserService(IUserRepository userRepository, IMapper mapper) : IUserService
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var Users = await _userRepository.GetAllAsync();

            if (Users == null || !Users.Any())
            {
                return Enumerable.Empty<UserDto>();
            }

            var UsersDto = _mapper.Map<IEnumerable<UserDto>>(Users);

            return UsersDto;
        }

        public async Task<UserDto> GetByIdAsync(int id)
        {
            var User = await _userRepository.GetByIdAsync(id)
                ?? null;
            var UserDto = _mapper.Map<UserDto>(User);

            return UserDto;

        }

        public async Task<UserDto> AddAsync(CreateOrUpdateUserDto userDto)
        {
            var NewUser = _mapper.Map<User>(userDto);
            var UserDetails = await _userRepository.AddAsync(NewUser);
            return _mapper.Map<UserDto>(UserDetails);
        }

        public async Task<UserDto> UpdateAsync(int id, CreateOrUpdateUserDto userDto)
        {

            var existingUser = await _userRepository.GetByIdAsync(id);

            _mapper.Map(userDto, existingUser);

            var UserDetails = await _userRepository.UpdateAsync(id, existingUser);
            return _mapper.Map<UserDto>(UserDetails);


        }

        public async Task<bool> DeleteAsync(int id) => await _userRepository.DeleteAsync(id);
        public async Task<int> Count() => await _userRepository.Count();
        public async Task<bool> ExistsAsync(int id) => await _userRepository.ExistsAsync(id);
        public async Task<bool> ExistsByEmailAsync(string email) => await _userRepository.ExistsByEmailAsync(email);
        public async Task<IEnumerable<UserDto>> PagerUsersUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations)
        {
            var predicate = BuildMySearch<User>.BuildPredicate(column, Operations, value);

            var Users = await _userRepository.PagerUsersUsingPageNumber(pageNumber, pageSize, predicate);
            return _mapper.Map<IEnumerable<UserDto>>(Users);
        }
        public async Task<UserDto> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email)
                ?? null;
            var userDto = _mapper.Map<UserDto>(user);

            return userDto;

        }

    }


}
