using AutoMapper;
using HotelBussinse.DTOs.Countries;
using HotelDataAceess.Entiteis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Mappers
{
    public class CountryMapper:Profile
    {
        public CountryMapper()
        {
            CreateMap<Country, CountryDto>();
            CreateMap<CreateOrUpdateCountryDto, Country>();

        }
    }
}
