using AutoMapper;
using HotelBussinse.DTOs.Room;
using HotelBussinse.DTOs.RoomType;
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
    public class RoomTypeService(IRoomTypeRepositry roomTypeRepository, IMapper mapper) : IRoomTrypeService
    {
        private readonly IRoomTypeRepositry _roomTypeRepository = roomTypeRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<RoomTypeDto>> GetAllAsync()
        {
            var RoomTypes = await _roomTypeRepository.GetAllAsync();

            if (RoomTypes == null)
            {
                return Enumerable.Empty<RoomTypeDto>();
            }
            var RoomTypesDto = _mapper.Map<IEnumerable<RoomTypeDto>>(RoomTypes);

            return RoomTypesDto;
        }

        public async Task<RoomTypeDto> GetByIdAsync(int id)
        {
            var RoomType = await _roomTypeRepository.GetByIdAsync(id)
                ?? null;
            var RoomTypeDto = _mapper.Map<RoomTypeDto>(RoomType);

            return RoomTypeDto;

        }

        public async Task<RoomTypeDto> AddAsync(CreateOrUpdateRoomTypeDto roomtypeDto)
        {
            bool RoomTypeTitleIsExists = await _roomTypeRepository.ExistsRoomTypeByRoomTypeTitleAsync(roomtypeDto.RoomTypeTitle);
            if (RoomTypeTitleIsExists)
                throw new ValidationException("The RoomType Is Exists with same Room Type Title.");

            var NewRoomType = _mapper.Map<RoomType>(roomtypeDto);
                var RoomTypeDetails = await _roomTypeRepository.AddAsync(NewRoomType);
                return _mapper.Map<RoomTypeDto>(RoomTypeDetails);


        }

        public async Task<RoomTypeDto> UpdateAsync(int id, CreateOrUpdateRoomTypeDto roomtypeDto)
        {
            var RoomType = await _roomTypeRepository.GetByIdAsync(id);
            if (roomtypeDto.RoomTypeTitle != RoomType.RoomTypeTitle)
            {
                bool RoomTypeTitleIsExists = await _roomTypeRepository.ExistsRoomTypeByRoomTypeTitleAsync(roomtypeDto.RoomTypeTitle);
                if (RoomTypeTitleIsExists)
                    throw new ValidationException("The RoomType Is Exists with same Room Type Title.");

            }

            var existingRoomType = await _roomTypeRepository.GetByIdAsync(id);

                _mapper.Map(roomtypeDto, existingRoomType);

                var RoomTypeDetails = await _roomTypeRepository.UpdateAsync(id, existingRoomType);
                return _mapper.Map<RoomTypeDto>(RoomTypeDetails);
        }

        public async Task<bool> DeleteAsync(int id) => await _roomTypeRepository.DeleteAsync(id);

        public async Task<int> Count() => await _roomTypeRepository.Count();
        public async Task<bool> ExistsAsync(int id) => await _roomTypeRepository.ExistsAsync(id);
        public async Task<IEnumerable<RoomTypeDto>> PagerRoomTypeUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations)
        {
            var predicate = BuildMySearch<RoomType>.BuildPredicate(column, Operations, value);

            var Rooms = await _roomTypeRepository.PagerRoomTypeUsingPageNumber(pageNumber, pageSize, predicate);
            return _mapper.Map<IEnumerable<RoomTypeDto>>(Rooms);
        }
    }
}
