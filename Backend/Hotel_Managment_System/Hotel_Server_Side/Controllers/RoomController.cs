using Hotel_Server_Side.Global;
using HotelBussinse.DTOs.Room;
using HotelBussinse.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hotel_Server_Side.Controllers
{
    [Route("api/Hotel/Room")]
    [ApiController]
    public class RoomController(IRoomService roomService, ILogger<RoomController> logger) : ControllerBase
    {
        private readonly IRoomService RoomService = roomService;
        private readonly ILogger _Logger = logger;

        [Authorize(Roles = "Admin,Employee,Guest")]
        [HttpGet("AllRooms", Name = "GetAllRooms")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<RoomDto>>> GetAllRooms()
        {
            try
            {
                var rooms = await RoomService.GetAllAsync();

                if (!rooms.Any())
                {
                    return NotFound("No Rooms found.");
                }

                return Ok(rooms);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Rooms.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee,Guest")]
        [HttpGet("RoomUsingPageNumber/{pageNumber}/{pageSize}/{column}/{value}/{Operations}", Name = "GetRoomUsingPageNumber")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<RoomDto>>> GetRoomUsingPageNumber(short pageNumber, int pageSize, string? column, string? value, string? Operations)
        {
            try
            {

                if (HelperMethod.IsInvalid(pageNumber, pageSize))
                {
                    return BadRequest("Page number and page size  must be valid.");
                }

                if (column == "null")
                {
                    column = null;
                    value = null;
                    Operations = null;

                }
                var rooms = await RoomService.PagerRoomUsingPageNumber(pageNumber, pageSize, column, value, Operations);

                if (!rooms.Any())
                {
                    return NotFound("No Rooms found.");
                }

                return Ok(rooms);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Rooms.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("SearchAvailableRooms/{pageNumber}/{pageSize}/{roomType}/{checkIn}/{checkOut}/{GuestNumber}", Name = "SearchAvailableRooms")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<RoomDto>>> SearchAvailableRooms(short pageNumber, int pageSize, string roomType, DateTime checkIn, DateTime checkOut, short GuestNumber)
        {
            try
            {

                if (pageNumber <= 0 || pageSize <= 0 || GuestNumber <= 0 || string.IsNullOrWhiteSpace(roomType))
                {
                    return BadRequest("Page number, page size, column, roomType and GuestNumber must be valid.");
                }

                (var rooms, int countRooms) = await RoomService.SearchAvailableRooms(pageNumber, pageSize, roomType, checkIn, checkOut, GuestNumber);

                if (!rooms.Any())
                {
                    return NotFound("No Rooms found.");
                }

                return Ok(new { rooms, countRooms });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Rooms.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee,Guest")]
        [HttpGet("FindRoom/{id}", Name = "FindRoom")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<RoomDto>> Find(int id)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var room = await RoomService.GetByIdAsync(id);

                if (room == null)
                {
                    return NotFound("No Room found.");
                }

                return Ok(room);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Room.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpPost("AddRoom", Name = "AddRoom")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<RoomDto>> Add(CreateOrUpdateRoomDto newRoom)
        {
            try
            {
                if (newRoom == null)
                {
                    return BadRequest("Input data cannot be null");
                }

                var roomDetails = await RoomService.AddAsync(newRoom);

                return Ok(roomDetails);
            }
            catch (Exception ex)
            {
                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;

                _Logger.LogError(errorMessage, "An error occurred while getting Room.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpPut("UpdateRoom/{id}", Name = "UpdateRoom")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<RoomDto>> Update(int id, CreateOrUpdateRoomDto updateRoom)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var room = await RoomService.GetByIdAsync(id);

                if (room == null)
                {
                    return NotFound("No Room found.");
                }

                var roomDetails = await RoomService.UpdateAsync(id, updateRoom);

                return Ok(roomDetails);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Room.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpDelete("DeleteRoom/{id}", Name = "DeleteRoom")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var room = await RoomService.GetByIdAsync(id);

                if (room == null)
                {
                    return NotFound("No Room found.");
                }

                return Ok(await RoomService.DeleteAsync(id));
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Room.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("ExistsRoom/{id}", Name = "ExistsRoom")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<bool>> Exists(int id)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                bool IsFound = await RoomService.ExistsAsync(id);

                return Ok(IsFound);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Room.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("ExistsByRoomNumber/{roomNumber}/{roomId}")]
        public async Task<ActionResult<bool>> ValidateRoomNumberAsync(string roomNumber, int roomId)
        {
            if (string.IsNullOrWhiteSpace(roomNumber))
            {
                return BadRequest("Room number must be provided.");
            }

            bool isFound =
                await RoomService.ExistsByNumberRoomAsync(roomNumber, roomId);

            return Ok(isFound);
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("IsRoomAvailable/{bookingId}/{id}/{checkInDate}/{checkOutDate}")]
        public async Task<ActionResult<bool>> IsRoomAvailable(int bookingId, int id, string checkInDate, string checkOutDate)
        {
            if (HelperMethod.IsInvalidId(id))
            {
                return BadRequest("Id must be greater than zero.");
            }

            if (!DateTime.TryParse(checkInDate, out DateTime checkIn) || !DateTime.TryParse(checkOutDate, out DateTime checkOut))
            {
                return BadRequest("Invalid date format. Please use YYYY-MM-DD");
            }


            bool isFound =
                await RoomService.IsRoomAvailable(bookingId, id, checkIn, checkOut);

            return Ok(isFound);
        }


        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("IsRoomAvailableByAvailabilityStatus/{roomId}")]
        public async Task<ActionResult<bool>> IsRoomAvailableByAvailabilityStatus(int roomId)
        {
            if (HelperMethod.IsInvalidId(roomId))
            {
                return BadRequest("roomId must be greater than zero.");
            }




            bool isFound =
                await RoomService.IsRoomAvailableByAvailabilityStatus(roomId);

            return Ok(isFound);
        }


        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("CountRoom/{column}/{value}/{Operations}", Name = "CountRoom")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<int>> Count(string? column, string? value, string? Operations)
        {
            try
            {
                if (column == "null")
                {
                    column = null;
                    value = null;
                    Operations = null;

                }

                return Ok(await RoomService.Count(column, value, Operations));
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Room.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("GetCountActiveRoom", Name = "GetCountActiveRoom")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<int>> GetCountActiveRoom()
        {
            try
            {

                return Ok(await RoomService.GetCountActiveRoom());
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Room.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


        [Authorize(Roles = "Admin,Employee,Guest")]
        [HttpPut("UpdateRoomAvailabilityStatus/{id}/{availabilityStatus}", Name = "UpdateRoomAvailabilityStatus")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<bool>> UpdateRoomAvailabilityStatus(int id, short availabilityStatus)
        {
            try
            {

                if (id <= 0 || availabilityStatus < 0)
                {
                    return BadRequest("availabilityStatus must be between 0 and 2.");
                }

                bool upRoom = await RoomService.UpdateRoomAvailabilityStatus(id, availabilityStatus);

                if (!upRoom)
                {
                    return NotFound("No Room found.");
                }

                return Ok(upRoom);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Room.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }

}