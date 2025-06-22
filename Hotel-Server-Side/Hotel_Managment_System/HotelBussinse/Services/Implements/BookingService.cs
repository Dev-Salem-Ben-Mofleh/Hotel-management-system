using AutoMapper;
using HotelBussinse.DTOs.Booking;
using HotelBussinse.DTOs.DTOViews;
using HotelBussinse.Global;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Entiteis.Views;
using HotelDataAceess.Enums;
using HotelDataAceess.Repository.Implements;
using HotelDataAceess.Repository.Interfaces;
using HotelDataAceess.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Implements
{
    public class BookingService(IBookingRepositry bookingRepository,IRoomRepositry roomRepositry,IRoomTypeRepositry roomTypeRepositry,IPaymentRepositry paymentRepositry,IPersonRepository personRepository, IUnitOfWork unitOfWork, IMapper mapper) : IBookingService
    {
        private readonly IBookingRepositry _bookingRepository = bookingRepository;
        private readonly IRoomRepositry _roomRepositry = roomRepositry;
        private readonly IRoomTypeRepositry _roomTypeRepositry = roomTypeRepositry;
        private readonly IPaymentRepositry _paymentRepositry = paymentRepositry;
        private readonly IPersonRepository _personRepository = personRepository;
        private readonly IMapper _mapper = mapper;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;


        private async Task<Room> GetRoomOrThrowAsync(int roomId)
        {
            var room = await _roomRepositry.GetByIdAsync(roomId);
            if (room == null)
                throw new KeyNotFoundException("Room not found");
            return room;
        }

        private async Task<RoomType> GetRoomTypeOrThrowAsync(int roomTypeId)
        {
            var roomType = await _roomTypeRepositry.GetByIdAsync(roomTypeId);
            if (roomType == null)
                throw new KeyNotFoundException("Room type not found");
            return roomType;
        }

        private async Task EnsurePersonExistsAsync(int personId)
        {
            if (!await _personRepository.ExistsAsync(personId))
                throw new ValidationException("Person not found");
        }

        private async Task IsRoomAvailable(int bookingID, int id, DateTime checkIn, DateTime checkOut)
        {
            if (!await _roomRepositry.IsRoomAvailable(bookingID,id, checkIn, checkOut))
                throw new ValidationException("room not Available in this date");
        }

        private void ValidateDates(DateTime checkIn, DateTime checkOut)
        {
            if (!HelperMethodBussinse.CheckDate(checkIn, checkOut))
                throw new ValidationException("Check Out Date must be greater than Check In Date");
        }

        public async Task<IEnumerable<BookingViewDto>> GetAllBookingAsync()
        {
            var Bookings = await _bookingRepository.GetAllBooking();

            if (Bookings == null)
            {
                return Enumerable.Empty<BookingViewDto>();
            }
            var BookingsDto = _mapper.Map<IEnumerable<BookingViewDto>>(Bookings);

            return BookingsDto;
        }
        public async Task<BookingDto> GetByIdAsync(int id)
        {
            var Booking = await _bookingRepository.GetByIdAsync(id)
                ?? null;
            var BookingDto = _mapper.Map<BookingDto>(Booking);

            return BookingDto;

        }
        public async Task<BookingDto> AddAsync(CreateOrUpdateBookingDto bookingDto)
        {
            await _unitOfWork.BeginTransactionAsync();
            try
            {
                var room = await GetRoomOrThrowAsync(bookingDto.RoomId);
                var roomType = await GetRoomTypeOrThrowAsync(room.RoomTypeId);
                await EnsurePersonExistsAsync(bookingDto.PersonId);
                await IsRoomAvailable(0,bookingDto.RoomId, bookingDto.CheckInDate, bookingDto.CheckOutDate);
                ValidateDates(bookingDto.CheckInDate, bookingDto.CheckOutDate);

                if (room.AvailabilityStatus != AvailabilityStatus.Available)
                    throw new ValidationException("Room is not available");



                int days = HelperMethodBussinse.GetDays(bookingDto.CheckInDate, bookingDto.CheckOutDate);
                decimal totalPrice = HelperMethodBussinse.CalculateThePrice(roomType.RoomTypePricePerNight, days);

                var booking = _mapper.Map<Booking>(bookingDto);
                var savedBooking = await _unitOfWork.booking.AddAsync(booking);

                await _unitOfWork.payment.AddAsync(new Payment
                {
                    BookingId = savedBooking.BookingId,
                    PaymentDate = DateTime.Now,
                    PaidAmount = totalPrice
                });

                await _unitOfWork.CompleteAsync();
                await _unitOfWork.CommitAsync();

                return _mapper.Map<BookingDto>(savedBooking);
        }
             catch
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
        public async Task<BookingDto> UpdateAsync(int id, CreateOrUpdateBookingDto bookingDto)
        {
            await _unitOfWork.BeginTransactionAsync();
            try
            {
                var existingBooking = await _bookingRepository.GetByIdAsync(id);
                if (existingBooking == null)
                    throw new KeyNotFoundException("Booking not found");

                var room = await GetRoomOrThrowAsync(bookingDto.RoomId);
                var roomType = await GetRoomTypeOrThrowAsync(room.RoomTypeId);
                await EnsurePersonExistsAsync(bookingDto.PersonId);
                await IsRoomAvailable(existingBooking.BookingId, bookingDto.RoomId, bookingDto.CheckInDate, bookingDto.CheckOutDate);
                ValidateDates(bookingDto.CheckInDate, bookingDto.CheckOutDate);

                if (room.RoomId != existingBooking.RoomId)
                {
                    if (room.AvailabilityStatus != AvailabilityStatus.Available)
                        throw new ValidationException("New room is not available");

                }

                int days = HelperMethodBussinse.GetDays(bookingDto.CheckInDate, bookingDto.CheckOutDate);
                decimal totalPrice = HelperMethodBussinse.CalculateThePrice(roomType.RoomTypePricePerNight, days);

                var payment = await _paymentRepositry.GetByBookingIdAsync(existingBooking.BookingId);
                if (payment != null)
                {
                    payment.PaidAmount = totalPrice;
                    await _unitOfWork.payment.UpdateAsync(payment.PaymentId, payment);
                }

                _mapper.Map(bookingDto, existingBooking);
                var updatedBooking = await _unitOfWork.booking.UpdateAsync(id, existingBooking);

                await _unitOfWork.CompleteAsync();
                await _unitOfWork.CommitAsync();

                return _mapper.Map<BookingDto>(updatedBooking);
            }
            catch
            {
                await _unitOfWork.RollbackAsync(); 
                throw;
            }

        }
        public async Task<bool> DeleteAsync(int id) => await _bookingRepository.DeleteAsync(id);
        public async Task<int> Count() => await _bookingRepository.Count();
        public async Task<bool> ExistsAsync(int id) => await _bookingRepository.ExistsAsync(id);
        public async Task<IEnumerable<BookingViewDto>> PagerBookingUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations)
        {
            var predicate = BuildMySearch<BookingView>.BuildPredicate(column, Operations, value);

            var Bookings= await _bookingRepository.PagerBookingUsingPageNumber(pageNumber, pageSize, predicate);
            return _mapper.Map<IEnumerable<BookingViewDto>>(Bookings);
        }
        public async Task<bool> UpdateBookingStatus(int id, short Status) => await _bookingRepository.UpdateBookingStatus(id, Status);
        public async Task<IEnumerable<BookingViewDto>> GetAllBookingByPersonID(int id)
        {
            var Bookings = await _bookingRepository.GetAllBookingByPersonID(id);
            return _mapper.Map<IEnumerable<BookingViewDto>>(Bookings);
        }
        public async Task<decimal> GetTheTotalPrice(decimal RoomTypePricePerNight, DateTime CheckInDate, DateTime CheckOutDate)
        {
            int days =Math.Abs((CheckInDate - CheckOutDate).Days);
            return  (RoomTypePricePerNight * days);
        }


    }
}
