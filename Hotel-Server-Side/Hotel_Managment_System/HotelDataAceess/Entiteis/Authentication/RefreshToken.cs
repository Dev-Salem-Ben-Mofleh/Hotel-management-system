﻿using System;

namespace HotelDataAceess.Entiteis.Authentication
{
    public class RefreshToken
    {
        public int Id { get; set; }

        public string Token { get; set; }

        public DateTime ExpiresOn { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? RevokedOn { get; set; }

        public bool IsRevoked => RevokedOn != null;

        public bool IsActive => !IsRevoked && DateTime.UtcNow < ExpiresOn;

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
