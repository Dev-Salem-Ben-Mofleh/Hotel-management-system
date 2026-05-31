using AutoMapper;
using HotelBussinse.DTOs.Booking;
using HotelBussinse.Mappers.MaooerEnums;
using HotelDataAceess.Entiteis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Mappers
{
    internal class BookingMapper:Profile
    {
        public BookingMapper()
        {
            CreateMap<Booking, BookingDto>();
            CreateMap<CreateOrUpdateBookingDto, Booking>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom<StatuesValueResolver>());
            ;
        }
    }
}
