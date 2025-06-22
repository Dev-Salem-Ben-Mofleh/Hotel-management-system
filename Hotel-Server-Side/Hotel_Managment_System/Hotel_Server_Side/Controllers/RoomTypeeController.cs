using Hotel_Server_Side.Global;
using HotelBussinse.DTOs.Persons;
using HotelBussinse.DTOs.RoomType;
using HotelBussinse.Services.Implements;
using HotelBussinse.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hotel_Server_Side.Controllers
{
    [Route("api/Hotel/RoomType")]
    [ApiController]
    public class RoomTypeeController(IRoomTrypeService roomTypeService, ILogger<RoomTypeeController> logger) : ControllerBase
    {
        private readonly IRoomTrypeService RoomTypeService = roomTypeService;
        private readonly ILogger Logger = logger;

        [HttpGet("AllRoomTypes", Name = "GetAllRoomTypes")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<RoomTypeDto>>> GetAllRoomTypes()
        {
            try
            {
                var roomTypes = await RoomTypeService.GetAllAsync();

                if (!roomTypes.Any())
                {
                    return NotFound("No RoomTypes found.");
                }

                return Ok(roomTypes);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while getting RoomTypes.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee,Guest")]
        [HttpGet("RoomTypeUsingPageNumber/{pageNumber}/{pageSize}/{column}/{value}/{Operations}", Name = "GetRoomTypeUsingPageNumber")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<RoomTypeDto>>> GetRoomTypeUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations)
        {
            try
            {

                if (HelperMethod.IsInvalid(pageNumber, pageSize, column, value, Operations))
                {
                    return BadRequest("Page number, page size, column, value and Operations must be valid.");
                }

                var roomTypes = await RoomTypeService.PagerRoomTypeUsingPageNumber(pageNumber, pageSize, column, value, Operations);

                if (!roomTypes.Any())
                {
                    return NotFound("No Rooms found.");
                }

                return Ok(roomTypes);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while getting Rooms.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee,Guest")]
        [HttpGet("FindRoomType/{id}", Name = "FindRoomType")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<RoomTypeDto>> Find(int id)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var roomType = await RoomTypeService.GetByIdAsync(id);

                if (roomType == null)
                {
                    return NotFound("No RoomType found.");
                }

                return Ok(roomType);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while getting RoomType.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpPost("AddRoomType", Name = "AddRoomType")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<RoomTypeDto>> Add(CreateOrUpdateRoomTypeDto newRoomType)
        {
            try
            {
                if (newRoomType == null)
                {
                    return BadRequest("Input data cannot be null");
                }

                var roomTypeDetails = await RoomTypeService.AddAsync(newRoomType);

                return Ok(roomTypeDetails);
            }
            catch (Exception ex)
            {
                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;

                Logger.LogError(errorMessage, "An error occurred while getting RoomType.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpPut("UpdateRoomType/{id}", Name = "UpdateRoomType")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<RoomTypeDto>> Update(int id, CreateOrUpdateRoomTypeDto updateRoomType)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var roomType = await RoomTypeService.GetByIdAsync(id);

                if (roomType == null)
                {
                    return NotFound("No RoomType found.");
                }

                var roomTypeDetails = await RoomTypeService.UpdateAsync(id, updateRoomType);

                return Ok(roomTypeDetails);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while getting Room.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpDelete("DeleteRoomType/{id}", Name = "DeleteRoomType")]
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
                var roomType = await RoomTypeService.GetByIdAsync(id);

                if (roomType == null)
                {
                    return NotFound("No RoomType found.");
                }

                return Ok(await RoomTypeService.DeleteAsync(id));
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while getting Room.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("ExistsRoomType/{id}", Name = "ExistsRoomType")]
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
                bool IsFound = await RoomTypeService.ExistsAsync(id);

                return Ok(IsFound);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while getting Room.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("CountRoomType", Name = "CountRoomType")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<int>> Count()
        {
            try
            {
                return Ok(await RoomTypeService.Count());
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while getting Room.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
    