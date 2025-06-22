using Hotel_Server_Side.Global;
using HotelBussinse.DTOs.Booking;
using HotelBussinse.DTOs.DTOViews;
using HotelBussinse.DTOs.Payment;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Entiteis;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hotel_Server_Side.Controllers
{
    [Route("api/Hotel/Booking")]
    [ApiController]
    [Authorize]

    public class BookingController(IBookingService bookingService, ILogger<BookingController> logger) : ControllerBase
    {
        private readonly IBookingService BookingService = bookingService;
        private readonly ILogger _Logger = logger;

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("AllBookings", Name = "GetAllBookings")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<BookingViewDto>>> GetAllBookings()
        {
            try
            {
                var bookings = await BookingService.GetAllBookingAsync();

                if (!bookings.Any())
                {
                    return NotFound("No Bookings found.");
                }

                return Ok(bookings);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Bookings.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee,Guest")]
        [HttpGet("AllBookingsByPersonID/{id}", Name = "AllBookingsByPersonID")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<BookingViewDto>>> GetAllBookingsByPersonID(int id)
        {
            try
            {
                if (HelperMethod.IsInvalidId (id))
                {
                    return BadRequest("id must be greater than zero.");
                }

                var bookings = await BookingService.GetAllBookingByPersonID(id);

                if (!bookings.Any())
                {
                    return NotFound("No Bookings found.");
                }

                return Ok(bookings);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Bookings.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("BookingUsingPageNumber/{pageNumber}/{pageSize}/{column}/{value}/{Operations}", Name = "GetBookingUsingPageNumber")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<BookingViewDto>>> GetBookingUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations)
        {
            try
            {

                if (HelperMethod.IsInvalid(pageNumber, pageSize, column, value, Operations))
                {
                    return BadRequest("Page number, page size, column, value and Operations must be valid.");
                }
                var bookings = await BookingService.PagerBookingUsingPageNumber(pageNumber, pageSize, column, value, Operations);

                if (!bookings.Any())
                {
                    return NotFound("No Bookings found.");
                }

                return Ok(bookings);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Bookings.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("FindBooking/{id}", Name = "FindBooking")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<BookingDto>> Find(int id)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var booking = await BookingService.GetByIdAsync(id);

                if (booking == null)
                {
                    return NotFound("No Booking found.");
                }

                return Ok(booking);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Booking.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee,Guest")]
        [HttpPost("AddBooking", Name = "AddBooking")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<BookingDto>> AddBookingByUnitOfWork(CreateOrUpdateBookingDto newBooking)
        {

            try
            {
                if (newBooking == null)
                {
                    return BadRequest("Input data cannot be null");
                }

                var bookingDetails = await BookingService.AddAsync(newBooking);

                return Ok(bookingDetails);
            }
            catch (Exception ex)
            {
                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;

                _Logger.LogError(errorMessage, "An error occurred while getting Booking.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpPut("UpdateBooking/{id}", Name = "UpdateBooking")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<BookingDto>> UpdateBookingByUnitOfWork(int id, CreateOrUpdateBookingDto updateBooking)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var  booking = await BookingService.GetByIdAsync(id);

                if (booking == null)
                {
                    return NotFound("No Booking found.");
                }

                var bookingDetails = await BookingService.UpdateAsync(id, updateBooking);

                return Ok(bookingDetails);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Booking.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpDelete("DeleteBooking/{id}", Name = "DeleteBooking")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var booking = await BookingService.GetByIdAsync(id);

                if (booking == null)
                {
                    return NotFound("No Booking found.");
                }

                return Ok(await BookingService.DeleteAsync(id));
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Booking.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("ExistsBooking/{id}", Name = "ExistsBooking")]
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
                bool IsFound = await BookingService.ExistsAsync(id);

                return Ok(IsFound);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Booking.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("CountBooking", Name = "CountBooking")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<int>> Count()
        {
            try
            {
                return Ok(await BookingService.Count());
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Booking.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee,Guest")]
        [HttpPut("UpdateBookingStatus/{id}/{Status}", Name = "UpdateBookingStatus")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<bool>> UpdateBookingStatus(int id, short Status)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("id must be greater than zero.");
                }
                if( Status <= 0)
                {
                    return BadRequest("Status must be between 0 and 1.");
                }
                bool UpBooking = await BookingService.UpdateBookingStatus(id,Status);

                if (!UpBooking)
                {
                    return NotFound("No Booking found.");
                }

                return Ok(true);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Booking.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee,Guest")]
        [HttpGet("GetTheTotalPrice/{RoomTypePricePerNight}/{CheckInDate}/{CheckOutDate}", Name = "GetTheTotalPrice")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<decimal>> GetTheTotalPrice(decimal RoomTypePricePerNight, DateTime CheckInDate, DateTime CheckOutDate)
        {
            try
            {
                if (RoomTypePricePerNight < 0) 
                {
                    return BadRequest("id must be greater than zero.");
                }

                decimal Total = await BookingService.GetTheTotalPrice(RoomTypePricePerNight, CheckInDate, CheckOutDate);

                if (Total < 0) 
                {
                    return NotFound("No Booking found.");
                }

                return Ok(Total);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Booking.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
