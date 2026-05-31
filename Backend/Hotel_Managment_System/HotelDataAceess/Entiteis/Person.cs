using HotelDataAceess.Entiteis.Authentication;
using HotelDataAceess.Enums;
using System;
using System.Collections.Generic;

namespace HotelDataAceess.Entiteis;

public  class Person
{
    public int PersonId { get; set; }

    public string FullName { get; set; } = null!;

    public Gender Gender { get; set; } 

    public DateTime BirthDate { get; set; }

    public string Phone { get; set; } = null!;

    public int NationalityCountryId { get; set; }

    public virtual Country NationalityCountry { get; set; } = null!;

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual User? User { get; set; }
}
