using Hotel_Server_Side.Global;
using HotelBussinse.DTOs.DTOViews;
using HotelBussinse.DTOs.Persons;
using HotelBussinse.Services.Implements;
using HotelBussinse.Services.Interfaces;
using HotelDataAceess.Entiteis;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Hotel_Server_Side.Controllers
{
    [Route("api/Hotel/People")]
    [ApiController]

    public class PersonController(IPersonService personService, ILogger<PersonController> logger) : ControllerBase
    {
        private readonly IPersonService PersonService=personService;
        private readonly ILogger _Logger = logger;

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("AllPeople", Name = "GetAllPeople")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<ActionResult<IEnumerable<PersonDto>>> GetAllPersons()
        {
            try
            {
                var persons =await PersonService.GetAllPersonAsync();

                if (!persons.Any())
                {
                    return NotFound("No persons found.");
                }

                return Ok(persons);
            }
            catch (Exception ex) 
            {
                _Logger.LogError(ex, "An error occurred while getting persons.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("PersonsUsingPageNumber/{pageNumber}/{pageSize}/{column}/{value}/{Operations}", Name = "GetPersonsUsingPageNumber")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<PersonDto>>> GetPersonsUsingPageNumber(short pageNumber, int pageSize, string column, string value,string Operations)
        {
            try
            {

                if (HelperMethod.IsInvalid(pageNumber, pageSize, column, value, Operations))
                {
                    return BadRequest("Page number, page size, column, value and Operations must be valid.");
                }
                var persons = await PersonService.PagerPersonsUsingPageNumber(pageNumber, pageSize, column,value,Operations);

                if (!persons.Any())
                {
                    return NotFound("No Persons found.");
                }

                return Ok(persons);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Persons.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("FindPerson/{id}", Name = "FindPerson")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PersonDto>> Find(int id)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var person = await PersonService.GetByIdAsync(id);

                if (person == null) 
                {
                    return NotFound("No persons found.");
                }

                return Ok(person);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting persons.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("FindPersonByName/{Name}", Name = "FindPersonByName")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PersonDto>> FindByName(string Name)
        {
            try
            {
                if (string.IsNullOrEmpty(Name))
                {
                    return BadRequest("Name Not must be null or empty.");
                }
                var person = await PersonService.GetPersonByNameAsync(Name);

                if (person == null)
                {
                    return NotFound("No persons found.");
                }

                return Ok(person);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting persons.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("AddPerson", Name = "AddPerson")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PersonDto>> Add( CreateOrUpdatePersonDto newPerson)
        {
            try
            {
                if (newPerson == null)
                {
                    return BadRequest("Input data cannot be null");
                }

                var personDetails = await PersonService.AddAsync(newPerson);

                return Ok(personDetails);
            }
            catch (Exception ex)
            {
                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;

                _Logger.LogError(errorMessage, "An error occurred while getting persons.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee,Guest")]
        [HttpPut("UpdatePerson/{id}", Name = "UpdatePerson")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PersonDto>> Update(int id,CreateOrUpdatePersonDto updatePersonDto)
        {
            try
            {
                if (HelperMethod.IsInvalidId(id))
                {
                    return BadRequest("Id must be greater than zero.");
                }
                var person = await PersonService.GetByIdAsync(id);

                if (person == null)
                {
                    return NotFound("No persons found.");
                }

                var personDetails = await PersonService.UpdateAsync(id, updatePersonDto);

                return Ok(personDetails);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting persons.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpDelete("DeletePerson/{id}", Name = "DeletePerson")]
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
                var person = await PersonService.GetByIdAsync(id);

                if (person == null)
                {
                    return NotFound("No persons found.");
                }

                return Ok(await PersonService.DeleteAsync(id));
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting persons.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("ExistsPerson/{id}", Name = "ExistsPerson")]
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
                bool IsFound = await PersonService.ExistsAsync(id);

                return Ok(IsFound);
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Person.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [Authorize(Roles = "Admin,Employee")]
        [HttpGet("CountPersons", Name = "CountPersons")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<int>> Count()
        {
            try
            {
                return Ok(await PersonService.Count());
            }
            catch (Exception ex)
            {
                _Logger.LogError(ex, "An error occurred while getting Count Persons.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
    }
}
