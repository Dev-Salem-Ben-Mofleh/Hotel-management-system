using AutoMapper;
using HotelBussinse.DTOs.Booking;
using HotelBussinse.DTOs.DTOViews;
using HotelBussinse.DTOs.Payment;
using HotelBussinse.Global;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Entiteis.Views;
using HotelDataAceess.Repository.Implements;
using HotelDataAceess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Implements
{
    public class PaymentService(IPaymentRepositry paymentRepository, IMapper mapper) : IPaymentService
    {
        private readonly IPaymentRepositry _paymentRepository = paymentRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<PaymentDto>> GetAllAsync()
        {
            var Payments = await _paymentRepository.GetAllAsync();

            if (Payments == null)
            {
                return Enumerable.Empty<PaymentDto>();
            }
            var PaymentsDto = _mapper.Map<IEnumerable<PaymentDto>>(Payments);

            return PaymentsDto;
        }

        public async Task<PaymentDto> GetByIdAsync(int id)
        {
            var Payment = await _paymentRepository.GetByIdAsync(id)
                ?? null;
            var PaymentDto = _mapper.Map<PaymentDto>(Payment);
            return PaymentDto;

        }

        public async Task<PaymentDto> AddAsync(CreateOrUpdatePaymentDto paymentDto)
        {
                var NewPayment = _mapper.Map<Payment>(paymentDto);
                var PaymentDetails = await _paymentRepository.AddAsync(NewPayment);
                return _mapper.Map<PaymentDto>(PaymentDetails);
        }

        public async Task<PaymentDto> UpdateAsync(int id, CreateOrUpdatePaymentDto paymentDto)
        {
                var existingPayment = await _paymentRepository.GetByIdAsync(id);
            if (existingPayment == null)
                throw new KeyNotFoundException("The Payment is not found");

            _mapper.Map(paymentDto, existingPayment);

                var PaymentDetails = await _paymentRepository.UpdateAsync(id, existingPayment);
                return _mapper.Map<PaymentDto>(PaymentDetails);
        }
        public async Task<bool> DeleteAsync(int id) => await _paymentRepository.DeleteAsync(id);
        public async Task<int> Count() => await _paymentRepository.Count();
        public async Task<bool> ExistsAsync(int id) => await _paymentRepository.ExistsAsync(id);
        public async Task<IEnumerable<PaymentDto>> PagerPaymentsUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations)
        {
            var predicate = BuildMySearch<Payment>.BuildPredicate(column, Operations, value);

            var Payments = await _paymentRepository.PagerPaymentsUsingPageNumber(pageNumber, pageSize, predicate);
            return _mapper.Map<IEnumerable<PaymentDto>>(Payments);
        }


    }
}
