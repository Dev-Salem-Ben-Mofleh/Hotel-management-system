using HotelBussinse.DTOs.Persons;

namespace HotelBussinse.DTOs.Auth;

public class UserDto
{
    public int UserId { get; set; }

    public int PersonId { get; set; }

    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;

    public string Role { get; set; } = null!;
    public PersonDto personDto { get; set; }




}
