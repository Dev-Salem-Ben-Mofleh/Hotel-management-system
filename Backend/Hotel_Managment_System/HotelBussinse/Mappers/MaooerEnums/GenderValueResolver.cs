using AutoMapper;
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
    public class GenderValueResolver : IValueResolver<CreateOrUpdatePersonDto, Person, Gender>
    {
        public Gender Resolve(CreateOrUpdatePersonDto source, Person destination, Gender destMember, ResolutionContext context)
        {
            return Enum.TryParse<Gender>(source.Gender, ignoreCase: true, out var gender)
                ? gender
                : Gender.Male; // Default value if parsing fails
        }
    }
}
