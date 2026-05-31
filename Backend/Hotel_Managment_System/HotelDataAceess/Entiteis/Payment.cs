using System;
using System.Collections.Generic;

namespace HotelDataAceess.Entiteis;

public  class Payment
{
    public int PaymentId { get; set; }

    public int BookingId { get; set; }

    public DateTime PaymentDate { get; set; }

    public decimal PaidAmount { get; set; }
    public virtual Booking Booking { get; set; } = null!;

}
