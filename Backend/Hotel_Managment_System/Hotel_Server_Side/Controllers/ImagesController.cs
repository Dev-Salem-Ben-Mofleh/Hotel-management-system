using HotelBussinse.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hotel_Server_Side.Controllers
{
    [Route("api/Hotel/images")]
    [ApiController]
    public class ImagesController(ICloudinaryService cloudinaryService) : ControllerBase
    {
        private readonly ICloudinaryService _cloudinaryService = cloudinaryService;

        [HttpPost("UploadImage")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<IActionResult> UploadImage([FromForm] IFormFile ImageFile)
        {
            if (ImageFile == null || ImageFile.Length == 0)
                return BadRequest("No file uploaded.");

            using var stream = ImageFile.OpenReadStream();
            var result = await _cloudinaryService.UploadImage(stream, ImageFile.FileName);

            return Ok(new { url = result });
        }


        [HttpPut("UpdateImage")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<IActionResult> UpdateImage([FromQuery] string oldImageUrl, [FromForm] IFormFile file)
        {
            if (string.IsNullOrWhiteSpace(oldImageUrl) || file == null || file.Length == 0)
                return BadRequest("Invalid input. Old image URL or file is missing.");

            using var stream = file.OpenReadStream();
            var result = await _cloudinaryService.UpdateImage(stream, oldImageUrl, file.FileName);

            return Ok(new { url = result });

        }


        [HttpDelete("DeleteImage")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<IActionResult> DeleteImage([FromQuery] string ImageUrl)
        {
            if (string.IsNullOrWhiteSpace(ImageUrl))
                return BadRequest("No file URL provided.");

            var result = await _cloudinaryService.DeleteImage(ImageUrl);

            return Ok(new { isDeleted = result });

        }


    }
}
