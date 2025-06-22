using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection.Emit;
using HotelDataAceess.Entiteis.Authentication;
using System.Data;

namespace HotelDataAceess.Configrations
{
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(e => e.UserId).HasName("PK__Users__1788CCACB0319B20");

            builder.HasIndex(e => e.PersonId, "UQ__Users__AA2FFB84A120F0B3").IsUnique();

            builder.Property(e => e.UserId).HasColumnName("UserID");
            builder.Property(e => e.Password).HasMaxLength(65);
            builder.Property(e => e.PersonId).HasColumnName("PersonID");
            builder.Property(e => e.Email).HasMaxLength(100);
            builder.Property(e => e.Role).HasMaxLength(20).HasDefaultValue("Guest");

            builder.HasOne(d => d.Person).WithOne(p => p.User)
                    .HasForeignKey<User>(d => d.PersonId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__Users__PersonID__4CA06362");

            builder.HasMany(d => d.RefreshTokens).WithOne(p => p.User)
             .HasForeignKey(x => x.UserId)
             .OnDelete(DeleteBehavior.Restrict);


        }
    }
}
