using AutoMapper;
using HotelBussinse.DTOs.Auth;
using HotelDataAceess.Entiteis.Authentication;

namespace HotelBussinse.Mappers
{
    public class UserMapper : Profile
    {

        public UserMapper()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.personDto,
              opt => opt.MapFrom(src => src.Person));
            CreateMap<CreateOrUpdateUserDto, User>();

        }

    }
}
