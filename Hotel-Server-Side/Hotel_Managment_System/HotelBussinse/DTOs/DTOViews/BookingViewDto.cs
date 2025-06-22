using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.DTOs.DTOViews
{
    public class BookingViewDto
    {
        public int BookingId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime? CheckOutDate { get; set; }
        public string FullName { get; set; } = null!;
        public string CountryName { get; set; } = null!;
        public decimal PaidAmount { get; set; }
        public string RoomNumber { get; set; } = null!;
        public byte RoomFloor { get; set; }
        public string Status { get; set; } = null!;
    }
}