using AutoMapper;
using HotelBussinse.DTOs.Room;
using HotelDataAceess.Entiteis;

namespace HotelBussinse.Mappers
{
    public class RoomMapper : Profile
    {
        public RoomMapper()
        {
            CreateMap<Room, RoomDto>()
                     .ForMember(dest => dest.roomTypeDto, opt => opt.MapFrom(src => src.RoomType));

            CreateMap<CreateOrUpdateRoomDto, Room>();

        }
    }
}
