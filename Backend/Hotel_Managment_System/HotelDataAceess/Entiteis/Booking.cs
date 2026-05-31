using HotelDataAceess.Enums;
using System;
using System.Collections.Generic;

namespace HotelDataAceess.Entiteis;

public  class Booking
{
    public int BookingId { get; set; }

    public int PersonId { get; set; }
    public int RoomId { get; set; }

    public DateTime CheckInDate { get; set; }

    public DateTime CheckOutDate { get; set; }

    public Statues Status { get; set; }

    public virtual Payment Payment { get; set; } = null!;
    public virtual Person Person { get; set; } = null!;
    public virtual Room Room { get; set; } = null!;


}
