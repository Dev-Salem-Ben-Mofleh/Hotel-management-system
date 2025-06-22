using Hotel_Server_Side.Global;
using HotelBussinse.DTOs.DTOViews;
using HotelBussinse.DTOs.Payment;
using HotelBussinse.Services.Implements;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Entiteis;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hotel_Server_Side.Controllers
{
    [Route("api/Hotel/Payment")]
    [ApiController]
    [Authorize]
    public class PaymentController (IPaymentService paymentService, ILogger<PaymentController> logger) : ControllerBase
    {
        private readonly IPaymentService PaymentService = paymentService;
        private readonly ILogger _Logger = logger;

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("AllPayments", Name = "GetAllPayments")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<PaymentDto>>> GetAllPayments()
        {
            try
            {
                var payments = await PaymentService.GetAllAsync();

                if (!payments.Any())
                {
                    return NotFound("No Payments found.");
                }

                return Ok(payments);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Payments.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("PaymentsUsingPageNumber/{pageNumber}/{pageSize}/{column}/{value}/{Operations}", Name = "GetPaymentsUsingPageNumber")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<PaymentDto>>> GetPaymentsUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations)
        {
            try
            {

                if (HelperMethod.IsInvalid(pageNumber, pageSize, column, value, Operations))
                {
                    return BadRequest("Page number, page size, column, value and Operations must be valid.");
                }

                var payments = await PaymentService.PagerPaymentsUsingPageNumber(pageNumber, pageSize, column, value, Operations);

                if (!payments.Any())
                {
                    return NotFound("No Payments found.");
                }

                return Ok(payments);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Payments.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("FindPayment/{id}", Name = "FindPayment")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PaymentDto>> Find(int id)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var Payment = await PaymentService.GetByIdAsync(id);

                if (Payment == null)
                {
                    return NotFound("No Payment found.");
                }

                return Ok(Payment);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Reservation.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee,Guest")]
        [HttpPost("AddPayment", Name = "AddPayment")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PaymentDto>> Add(CreateOrUpdatePaymentDto newPayment)
        {
            try
            {
                if (newPayment == null)
                {
                    return BadRequest("Input data cannot be null");
                }

                var paymentDetails = await PaymentService.AddAsync(newPayment);

                return Ok(paymentDetails);
            }
            catch (Exception ex)
            {
                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;

                _Logger.LogError(errorMessage, "An error occurred while getting Payment.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpPut("UpdatePayment/{id}", Name = "UpdatePayment")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PaymentDto>> Update(int id, CreateOrUpdatePaymentDto updatePayment)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var payment = await PaymentService.GetByIdAsync(id);

                if (payment == null)
                {
                    return NotFound("No Payment found.");
                }

                var paymentDetails = await PaymentService.UpdateAsync(id, updatePayment);

                return Ok(paymentDetails);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Payment.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpDelete("DeletePayment/{id}", Name = "DeletePayment")]
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
                var payment = await PaymentService.GetByIdAsync(id);

                if (payment == null)
                {
                    return NotFound("No Payment found.");
                }

                return Ok(await PaymentService.DeleteAsync(id));
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Payment.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("ExistsPayment/{id}", Name = "ExistsPayment")]
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
                bool IsFound = await PaymentService.ExistsAsync(id);

                return Ok(IsFound);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Payment.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("CountPayment", Name = "CountPayment")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<int>> Count()
        {
            try
            {
                return Ok(await PaymentService.Count());
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Payment.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

    }
}
