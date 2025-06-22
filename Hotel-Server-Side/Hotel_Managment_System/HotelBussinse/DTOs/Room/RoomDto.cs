using System;
using System.Collections.Generic;

namespace HotelBussinse.DTOs.Room;

public class RoomDto
{
    public int RoomId { get; set; }

    public int RoomTypeId { get; set; }

    public string RoomNumber { get; set; } = null!;

    public byte RoomFloor { get; set; }

    public decimal RoomSize { get; set; }

    public string AvailabilityStatus { get; set; } = null!;
    public string RoomImageUrl { get; set; } = null!;

    
    public bool IsSmokingAllowed { get; set; }

    public bool IsPetFriendly { get; set; }

    public string? AdditionalNotes { get; set; }

}
