using AutoMapper;
using HotelBussinse.DTOs.Room;
using HotelBussinse.Global;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Repository.Interfaces;
using System.ComponentModel.DataAnnotations;

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
        public async Task<int> Count(string? column, string? value, string? Operations)
        {

            if (!string.IsNullOrEmpty(column) && !string.IsNullOrEmpty(value) && !string.IsNullOrEmpty(Operations))
            {
                var predicate = BuildMySearch<Room>.BuildPredicate(column, Operations, value);
                return await _roomRepository.Count(predicate);
            }
            else
                return await _roomRepository.Count(null);


        }
        public async Task<bool> ExistsAsync(int id) => await _roomRepository.ExistsAsync(id);
        public async Task<bool> ExistsByNumberRoomAsync(string roomNumber, int roomId)
        {
            var room = await _roomRepository.GetByIdAsync(roomId);

            if (room is null)
            {
                return await _roomRepository.ExistsByNumberRoomAsync(roomNumber);
            }

            if (room.RoomNumber != roomNumber)
            {
                return await _roomRepository.ExistsByNumberRoomAsync(roomNumber);
            }

            return false;
        }
        public async Task<bool> IsRoomAvailable(int bookingID, int id, DateTime checkIn, DateTime checkOut) => await _roomRepository
            .IsRoomAvailable(bookingID, id, checkIn, checkOut);

        public async Task<IEnumerable<RoomDto>> PagerRoomUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations)
        {
            IEnumerable<Room> RoomTypes;

            if (!string.IsNullOrEmpty(column) && !string.IsNullOrEmpty(value) && !string.IsNullOrEmpty(Operations))
            {
                var predicate = BuildMySearch<Room>.BuildPredicate(column, Operations, value);
                RoomTypes = await _roomRepository.PagerRoomUsingPageNumber(pageNumber, pageSize, predicate);
            }
            else
            {
                RoomTypes = await _roomRepository.PagerRoomUsingPageNumber(pageNumber, pageSize, null);
            }

            return _mapper.Map<IEnumerable<RoomDto>>(RoomTypes);
        }
        public async Task<bool> UpdateRoomAvailabilityStatus(int id, short availabilityStatus) => await _roomRepository.UpdateRoomAvailabilityStatus(id, availabilityStatus);
        public async Task<(IEnumerable<RoomDto>, int count)> SearchAvailableRooms(short pageNumber, int pageSize, string roomType, DateTime checkIn, DateTime checkOut, short GuestNumber)
        {
            (var Rooms, int count) = await _roomRepository.SearchAvailableRooms(pageNumber, pageSize, roomType, checkIn, checkOut, GuestNumber);

            return (_mapper.Map<IEnumerable<RoomDto>>(Rooms), count);
        }
        public async Task<bool> IsRoomAvailableByAvailabilityStatus(int roomId) => await _roomRepository.IsRoomAvailableByAvailabilityStatus(roomId);

        public async Task<int> GetCountActiveRoom() => await _roomRepository.GetCountActiveRoom();
    }
}
