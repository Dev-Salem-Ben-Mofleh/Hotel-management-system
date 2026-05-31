using AutoMapper;
using HotelBussinse.DTOs.Booking;
using HotelBussinse.DTOs.Persons;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Mappers.MaooerEnums
{
    public class StatuesValueResolver : IValueResolver<CreateOrUpdateBookingDto, Booking, Statues>
    {
        public Statues Resolve(CreateOrUpdateBookingDto source, Booking destination, Statues destMember, ResolutionContext context)
        {
            return Enum.TryParse<Statues>(source.Status, ignoreCase: true, out var statue)
                ? statue
                : Statues.Confirmed; // Default value if parsing fails
        }
    }
}
