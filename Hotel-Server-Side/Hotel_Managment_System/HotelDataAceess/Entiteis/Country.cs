using System;
using System.Collections.Generic;

namespace HotelDataAceess.Entiteis;

public  class Country
{
    public int CountryId { get; set; }

    public string CountryName { get; set; } = null!;

    public virtual ICollection<Person> People { get; set; } = new List<Person>();
}
