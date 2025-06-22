using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.DTOs.Auth
{
    public class CreateOrUpdateUserDto
    {
        public int PersonId { get; set; }
        
        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Role { get; set; } = null!;

    }
}
