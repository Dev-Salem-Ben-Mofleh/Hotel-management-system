using System;
using System.Collections.Generic;

namespace HotelBussinse.DTOs.RoomType;

public class RoomTypeDto
{
    public int RoomTypeId { get; set; }

    public string RoomTypeTitle { get; set; } = null!;

    public byte RoomTypeCapacity { get; set; }

    public decimal RoomTypePricePerNight { get; set; }

    public string? RoomTypeDescription { get; set; }

}
