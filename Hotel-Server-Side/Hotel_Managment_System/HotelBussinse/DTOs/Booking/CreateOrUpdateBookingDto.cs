using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.DTOs.Booking
{
    public class CreateOrUpdateBookingDto
    {
        public int PersonId { get; set; }
        public int RoomId { get; set; }

        public DateTime CheckInDate { get; set; }

        public DateTime CheckOutDate { get; set; }

        public string Status { get; set; } = null!;

    }
}
