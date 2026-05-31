namespace HotelBussinse.DTOs.Auth
{
    public class CreateOrUpdateUserDto
    {
        public int PersonId { get; set; }

        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;

        public string Role { get; set; } = null!;

    }
}
