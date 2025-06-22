using Hotel_Server_Side.Global;
using HotelBussinse.DTOs.Countries;
using HotelBussinse.DTOs.Persons;
using HotelBussinse.Services.Implements;
using HotelBussinse.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hotel_Server_Side.Controllers
{
    [Route("api/Hotel/Countries")]
    [ApiController]
    public class CountryController(ICountryService countryService, ILogger<CountryController> logger) : ControllerBase
    {
        private readonly ICountryService CountryService = countryService;
        private readonly ILogger _Logger = logger;

        [HttpGet("AllCountries", Name = "GetAllCountries")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<CountryDto>>> GetAllCountries()
        {
            try
            {
                var countries = await CountryService.GetAllAsync();

                if (!countries.Any())
                {
                    return NotFound("No countries found.");
                }

                return Ok(countries);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting countries.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("FindCountry/{id}", Name = "FindCountry")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<CountryDto>> Find(int id)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var country = await CountryService.GetByIdAsync(id);

                if (country == null)
                {
                    return NotFound("No Country found.");
                }

                return Ok(country);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Country.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpPost("AddCountry", Name = "AddCountry")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<CountryDto>> Add(CreateOrUpdateCountryDto newCountry)
        {
            try
            {
                if (newCountry == null)
                {
                    return BadRequest("Input data cannot be null");
                }

                var countryDetails = await CountryService.AddAsync(newCountry);

                return Ok(countryDetails);
            }
            catch (Exception ex)
            {
                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;

                _Logger.LogError(errorMessage, "An error occurred while getting country.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpPut("UpdateCountry/{id}", Name = "UpdateCountry")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<CountryDto>> Update(int id, CreateOrUpdateCountryDto updateCountryDto)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var country = await CountryService.GetByIdAsync(id);

                if (country == null)
                {
                    return NotFound("No Country found.");
                }

                var countryDetails = await CountryService.UpdateAsync(id, updateCountryDto);

                return Ok(countryDetails);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Country.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpDelete("DeleteCountry/{id}", Name = "DeleteCountry")]
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
                var country = await CountryService.GetByIdAsync(id);

                if (country == null)
                {
                    return NotFound("No Country found.");
                }

                return Ok(await CountryService.DeleteAsync(id));
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Country.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
    
}
