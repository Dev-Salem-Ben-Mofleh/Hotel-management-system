using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.DTOs.Payment
{
    public class CreateOrUpdatePaymentDto
    {
        public int BookingId { get; set; }

        public DateTime PaymentDate { get; set; }

        public decimal PaidAmount { get; set; }
    }
}
