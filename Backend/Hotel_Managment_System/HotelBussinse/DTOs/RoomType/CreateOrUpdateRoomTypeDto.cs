using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.DTOs.RoomType
{
    public class CreateOrUpdateRoomTypeDto
    {
        public string RoomTypeTitle { get; set; } = null!;

        public byte RoomTypeCapacity { get; set; }

        public decimal RoomTypePricePerNight { get; set; }

        public string? RoomTypeDescription { get; set; }
    }
}
