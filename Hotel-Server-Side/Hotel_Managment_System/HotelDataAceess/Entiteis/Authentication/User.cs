using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HotelDataAceess.Entiteis.Authentication;

public class User
{
    public int UserId { get; set; }
    public int PersonId { get; set; }
    [ EmailAddress]
    public string Email { get; set; }
    public string Password { get; set; } = null!;
    public string Role { get; set; }
    public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    public virtual Person? Person { get; set; } = null!;

}



