using AutoMapper;
using HotelBussinse.DTOs.RoomType;
using HotelDataAceess.Entiteis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Mappers
{
    public class RoomTypeMapper:Profile
    {
        public RoomTypeMapper()
        {
            CreateMap<RoomType, RoomTypeDto>();
            CreateMap<CreateOrUpdateRoomTypeDto, RoomType>();


        }
    }
}
