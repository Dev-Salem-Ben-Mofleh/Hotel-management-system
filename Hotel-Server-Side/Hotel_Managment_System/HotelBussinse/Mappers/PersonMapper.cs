using AutoMapper;
using HotelBussinse.DTOs.Persons;
using HotelBussinse.Mappers.MaooerEnums;
using HotelDataAceess.Entiteis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Mappers
{
    public class PersonMapper:Profile
    {
        public PersonMapper()
        {
            CreateMap<Person, PersonDto>()
                .ForMember(dest => dest.countryDto, opt => opt.MapFrom(src => src.NationalityCountry));
            CreateMap<CreateOrUpdatePersonDto, Person>()
                .ForMember(dest => dest.Gender, opt => opt.MapFrom<GenderValueResolver>());
        }
    }
}
