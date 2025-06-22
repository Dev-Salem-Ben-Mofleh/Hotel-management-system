using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using HotelBussinse.DTOs.Auth;
using HotelDataAceess.Entiteis.Authentication;

namespace HotelBussinse.Mappers
{
    public class UserMapper: Profile
    {

        public UserMapper() 
        {
            CreateMap<User, UserDto>();
            CreateMap<CreateOrUpdateUserDto, User>();

        }

    }
}
