using AutoMapper;
using HotelBussinse.DTOs.DTOViews;
using HotelBussinse.DTOs.Payment;
using HotelBussinse.DTOs.Room;
using HotelBussinse.Global;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Repository.Implements;
using HotelDataAceess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Services.Implements
{
    public class RoomService(IRoomRepositry roomRepository, IMapper mapper) : IRoomService
    {
        private readonly IRoomRepositry _roomRepository = roomRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<RoomDto>> GetAllAsync()
        {
            var Rooms = await _roomRepository.GetAllAsync();

            if (Rooms == null)
            {
                return Enumerable.Empty<RoomDto>();
            }
            var RoomsDto = _mapper.Map<IEnumerable<RoomDto>>(Rooms);

            return RoomsDto;
        }

        public async Task<RoomDto> GetByIdAsync(int id)
        {
            var Room = await _roomRepository.GetByIdAsync(id)
                ?? null;
            var RoomDto = _mapper.Map<RoomDto>(Room);

            return RoomDto;

        }
        public async Task<RoomDto> AddAsync(CreateOrUpdateRoomDto roomDto)
        {
            bool numberIsExists = await _roomRepository.ExistsByNumberRoomAsync(roomDto.RoomNumber);
            if (numberIsExists)
                throw new ValidationException("The Room Is Exists with same name.");

            var NewRoom = _mapper.Map<Room>(roomDto);
                var RoomDetails = await _roomRepository.AddAsync(NewRoom);
                return _mapper.Map<RoomDto>(RoomDetails);
        }
        public async Task<RoomDto> UpdateAsync(int id, CreateOrUpdateRoomDto roomDto)
        {
            var Room = await _roomRepository.GetByIdAsync(id);
            if (roomDto.RoomNumber != Room.RoomNumber) 
            {
                bool numberIsExists = await _roomRepository.ExistsByNumberRoomAsync(roomDto.RoomNumber);
                if (numberIsExists)
                    throw new ValidationException("The Room Is Exists with same name.");

            }

            var existingRoom = await _roomRepository.GetByIdAsync(id);
                _mapper.Map(roomDto, existingRoom);

                var RoomDetails = await _roomRepository.UpdateAsync(id, existingRoom);
                return _mapper.Map<RoomDto>(RoomDetails);

         

        }
        public async Task<bool> DeleteAsync(int id) => await _roomRepository.DeleteAsync(id);
        public async Task<int> Count() => await _roomRepository.Count();
        public async Task<bool> ExistsAsync(int id) => await _roomRepository.ExistsAsync(id);
        public async Task<IEnumerable<RoomDto>> PagerRoomUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations)
        {
            var predicate = BuildMySearch<Room>.BuildPredicate(column, Operations, value);

            var Rooms = await _roomRepository.PagerRoomUsingPageNumber(pageNumber, pageSize, predicate);
            return _mapper.Map<IEnumerable<RoomDto>>(Rooms);
        }
        public async Task<bool> UpdateRoomAvailabilityStatus(int id, short availabilityStatus) => await _roomRepository.UpdateRoomAvailabilityStatus(id, availabilityStatus);
        public async Task<(IEnumerable<RoomDto>, int count)> SearchAvailableRooms(short pageNumber, int pageSize, string roomType, DateTime checkIn, DateTime checkOut, short GuestNumber)
        {
            (var Rooms ,int count) = await _roomRepository.SearchAvailableRooms(pageNumber, pageSize, roomType, checkIn, checkOut, GuestNumber);

            return( _mapper.Map<IEnumerable<RoomDto>>(Rooms), count);
        }
    }
}
