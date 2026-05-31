using System;
using System.Collections.Generic;

namespace HotelDataAceess.Entiteis;

public  class RoomType
{
    public int RoomTypeId { get; set; }

    public string RoomTypeTitle { get; set; } = null!;

    public byte RoomTypeCapacity { get; set; }

    public decimal RoomTypePricePerNight { get; set; }

    public string? RoomTypeDescription { get; set; }

    public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();
}
