using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HotelDataAceess.Enums;

namespace HotelBussinse.DTOs.Persons
{
    public class CreateOrUpdatePersonDto
    {
        public int PersonId { get; set; }
        public string FullName { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public DateTime BirthDate { get; set; }
        public string Phone { get; set; } = null!;
        public int NationalityCountryId { get; set; }
    }
}
