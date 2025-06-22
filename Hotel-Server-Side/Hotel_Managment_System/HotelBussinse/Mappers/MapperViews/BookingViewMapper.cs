using AutoMapper;
using HotelBussinse.DTOs.Booking;
using HotelBussinse.DTOs.DTOViews;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Entiteis.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Mappers.MapperViews
{
    public class BookingViewMapper :Profile
    {
        public BookingViewMapper() 
        {
            CreateMap<BookingView, BookingViewDto>();
        }

    }
}
