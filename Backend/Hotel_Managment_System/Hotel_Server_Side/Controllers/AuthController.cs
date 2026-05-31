using HotelBussinse.DTOs.Auth;
using HotelBussinse.DTOs.Booking;
using HotelBussinse.Services.Implements;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Entiteis.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hotel_Server_Side.Controllers
{
    [Route("api/Hotel/Auth")]
    [ApiController]
    public class AuthController(IAuthService authService, ILogger<BookingController> logger) : ControllerBase
    {
        private readonly IAuthService AuthService = authService;
        private readonly ILogger _Logger = logger;

        [HttpPost("SignUp", Name = "SignUp")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UserDto>> SignUp(CreateOrUpdateUserDto newUser)
        {
            try
            {
                if (newUser == null)
                {
                    _Logger.LogWarning("Received null input for user registration.");
                    return BadRequest("Input data cannot be null");
                }

                var userDetails = await AuthService.RegisterAsync(newUser);

                if (userDetails == null)
                {
                    _Logger.LogWarning("Registration attempt failed: Email {Email} already exists.", newUser.Email);
                    return BadRequest("A user with this email already exists.");
                }
                string succeseMessage = "Your account is created succesfuly now Please go and login your account";

                return Ok(new{ succeseMessage });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while registering user with email {Email}", newUser?.Email);
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


        [HttpPost("Login", Name = "Login")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<(string accessToken, string refreshToken)>> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(loginDto.Email) || string.IsNullOrWhiteSpace(loginDto.Password))
                {
                    logger.LogWarning("Email or password is empty.");
                    return BadRequest("Please enter email and password.");
                }

                (string accessToken, string refreshToken) = await AuthService.SignIn(loginDto.Email, loginDto.Password);

                if (string.IsNullOrEmpty(accessToken) || string.IsNullOrEmpty(refreshToken))
                {
                    return Unauthorized("Invalid email or password.");
                }


                return Ok(new { accessToken, refreshToken });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while  singIn user.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [HttpPost("RefreshToken", Name = "RefreshToken")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<object>> RefreshToken([FromBody] RefreshTokenDto dto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(dto.OldRefreshToken))
                {
                    logger.LogWarning("Refresh token is missing.");
                    return BadRequest("Refresh token is required.");
                }

                var (newAccessToken, newRefreshToken) = await AuthService.RefreshTokenAsync(dto.OldRefreshToken);

                if (string.IsNullOrEmpty(newAccessToken) || string.IsNullOrEmpty(newRefreshToken))
                {
                    return Forbid("Invalid or expired refresh token.");
                }

                return Ok(new { newAccessToken, newRefreshToken });
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while refreshing token.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("LogOut", Name = "LogOut")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<bool>> LogOut([FromBody] LogOutDto dto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(dto.RefreshToken))
                {
                    logger.LogWarning("Refresh token is missing.");
                    return BadRequest("Refresh token is required.");
                }

                var result = await AuthService.LogOut(dto.RefreshToken);

                if (!result)
                {
                    logger.LogWarning("Failed to log out: token may be invalid or already revoked.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while logging out the user.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }


    }
}
