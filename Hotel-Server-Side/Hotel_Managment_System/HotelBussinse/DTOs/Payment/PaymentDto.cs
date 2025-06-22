using System;
using System.Collections.Generic;

namespace HotelBussinse.DTOs.Payment;

public class PaymentDto
{
    public int PaymentId { get; set; }

    public int BookingId { get; set; }

    public DateTime PaymentDate { get; set; }

    public decimal PaidAmount { get; set; }



}
