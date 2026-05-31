using AutoMapper;
using HotelBussinse.DTOs.Payment;
using HotelDataAceess.Entiteis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Mappers
{
    public class PymentMapper:Profile
    {
        public PymentMapper()
        {
            CreateMap<Payment, PaymentDto>();
            CreateMap<CreateOrUpdatePaymentDto, Payment>();

        }
    }
}
