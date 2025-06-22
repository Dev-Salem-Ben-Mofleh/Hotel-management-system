using HotelBussinse.DTOs.Countries;
using System;
using System.Collections.Generic;

namespace HotelBussinse.DTOs.Persons;

public class PersonDto
{
    public int PersonId { get; set; }

    public string FullName { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public DateTime BirthDate { get; set; }

    public string Phone { get; set; } = null!;

    public int NationalityCountryId { get; set; }

    public CountryDto countryDto { get; set; } 

}
