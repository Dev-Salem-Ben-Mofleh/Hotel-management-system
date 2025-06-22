using HotelDataAceess.Entiteis;
using System;
using System.Collections.Generic;

namespace HotelBussinse.DTOs.Booking;

public class BookingDto
{
    public int BookingId { get; set; }

    public int PersonId { get; set; }
    public int RoomId { get; set; }

    public DateTime CheckInDate { get; set; }

    public DateTime? CheckOutDate { get; set; }

    public string Status { get; set; } = null!;

}
