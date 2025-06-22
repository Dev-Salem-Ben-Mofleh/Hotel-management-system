using AutoMapper;
using HotelBussinse.DTOs.Persons;
using HotelBussinse.DTOs.Room;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Mappers.MaooerEnums
{
    public class AvailabilityValueResolver : IValueResolver<CreateOrUpdateRoomDto, Room, AvailabilityStatus>
    {
        public AvailabilityStatus Resolve(CreateOrUpdateRoomDto source, Room destination, AvailabilityStatus destMember, ResolutionContext context)
        {
            return Enum.TryParse<AvailabilityStatus>(source.AvailabilityStatus, ignoreCase: true, out var gender)
                ? gender
                : AvailabilityStatus.Available; // Default value if parsing fails
        }
    }
}
