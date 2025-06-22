using AutoMapper;
using HotelBussinse.DTOs.Room;
using HotelDataAceess.Entiteis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Mappers
{
    public class RoomMapper:Profile
    {
        public RoomMapper()
        {
            CreateMap<Room, RoomDto>();
            CreateMap<CreateOrUpdateRoomDto, Room>();

        }
    }
}
