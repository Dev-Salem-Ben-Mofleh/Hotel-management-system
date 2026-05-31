using HotelDataAceess.Enums;
using System;
using System.Collections.Generic;

namespace HotelDataAceess.Entiteis;

public  class Room
{
    public int RoomId { get; set; }

    public int RoomTypeId { get; set; }

    public string RoomNumber { get; set; } = null!;

    public byte RoomFloor { get; set; }

    public decimal RoomSize { get; set; }

    public AvailabilityStatus AvailabilityStatus { get; set; }

    public bool IsSmokingAllowed { get; set; }

    public bool IsPetFriendly { get; set; }
    public string RoomImageUrl { get; set; } = null!;
    public string? AdditionalNotes { get; set; }
    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual RoomType RoomType { get; set; } = null!;
}
