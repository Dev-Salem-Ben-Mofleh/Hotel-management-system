using Hotel_Server_Side.Global;
using HotelBussinse.DTOs.Auth;
using HotelBussinse.DTOs.Persons;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Entiteis.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hotel_Server_Side.Controllers
{
    [Route("api/Hotel/User")]
    [ApiController]
    public class UserController(IUserService userService, ILogger<UserController> logger) : ControllerBase
    {
        private readonly IUserService UserService = userService;
        private readonly ILogger Logger = logger;

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("AllUsers", Name = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            try
            {
                var users = await UserService.GetAllUsersAsync();

                if (!users.Any())
                {
                    return NotFound("No Users found.");
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while getting Users.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("UsersUsingPageNumber/{pageNumber}/{pageSize}/{column}/{value}/{Operations}", Name = "GetUsersUsingPageNumber")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersUsingPageNumber(short pageNumber, int pageSize, string column, string value, string Operations)
        {
            try
            {

                if (HelperMethod.IsInvalid(pageNumber, pageSize, column, value, Operations))
                {
                    return BadRequest("Page number, page size, column, value and Operations must be valid.");
                }


                var users = await UserService.PagerUsersUsingPageNumber(pageNumber, pageSize, column, value, Operations);

                if (!users.Any())
                {
                    return NotFound("No Users found.");
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while getting Users.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("FindUser/{id}", Name = "FindUser")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UserDto>> Find(int id)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var user = await UserService.GetByIdAsync(id);

                if (user == null)
                {
                    return NotFound("No Users found.");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while getting Users.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpGet("FindUserByEmail/{email}", Name = "FindUserByEmailAndPassword")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UserDto>> FindUserByEmail(string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email) ) 
                {
                    return BadRequest("Email Or Password Not must be null or empty.");
                }
                var user = await UserService.GetUserByEmailAsync(email);

                if (user == null)
                {
                    return NotFound("No User found.");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while getting User.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpPost("AddUser", Name = "AddUser")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UserDto>> Add(CreateOrUpdateUserDto newUser)
        {
            try
            {
                if (newUser == null)
                {
                    return BadRequest("Input data cannot be null");
                }

                var userDetails = await UserService.AddAsync(newUser);

                return Ok(userDetails);
            }
            catch (Exception ex)
            {
                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;

                Logger.LogError(errorMessage, "An error occurred while Adding User.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpPut("UpdateUser/{id}", Name = "UpdateUser")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UserDto>> Update(int id, CreateOrUpdateUserDto updateUserDto)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var user = await UserService.GetByIdAsync(id);

                if (user == null)
                {
                    return NotFound("No User found.");
                }

                var userDetails = await UserService.UpdateAsync(id, updateUserDto);

                return Ok(userDetails);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while Updating User.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpDelete("DeleteUser/{id}", Name = "DeleteUser")]
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
                var user = await UserService.GetByIdAsync(id);

                if (user == null)
                {
                    return NotFound("No Users found.");
                }

                return Ok(await UserService.DeleteAsync(id));
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while Deleting User.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("ExistsUser/{id}", Name = "ExistsUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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
                bool IsFound = await UserService.ExistsAsync(id);

                if (IsFound)
                    return Ok(IsFound);
                else
                    return NotFound("No Users found.");

            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while getting User.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("ExistsUserByEmail/{email}", Name = "ExistsUserByEmail")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<bool>> ExistsByEmail(string email)
        {
            try
            {

                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest("Email Not must be null or empty.");
                }
                bool IsFound = await UserService.ExistsByEmailAsync(email);

                if (IsFound)
                    return Ok(IsFound);
                else
                    return NotFound("No Users found.");
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while getting User.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("CountUsers", Name = "CountUsers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<int>> Count()
        {
            try
            {
                return Ok(await UserService.Count());
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, "An error occurred while Counting Count Users.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }


}
