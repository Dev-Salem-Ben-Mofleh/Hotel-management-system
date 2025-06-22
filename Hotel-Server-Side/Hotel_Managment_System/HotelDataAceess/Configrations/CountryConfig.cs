using HotelDataAceess.Entiteis;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection.Emit;

namespace HotelDataAceess.Configrations
{
    public class CountryConfig : IEntityTypeConfiguration<Country>
    {
        public void Configure(EntityTypeBuilder<Country> builder)
        {
            builder.HasKey(e => e.CountryId).HasName("PK__Countrie__10D160BF6D64096B");

            builder.HasIndex(e => e.CountryName, "UQ__Countrie__E056F2013F3B1091").IsUnique();

            builder.Property(e => e.CountryId)
                    .HasColumnName("CountryID");
            builder.Property(e => e.CountryName).HasMaxLength(50);
        }
    }
}
