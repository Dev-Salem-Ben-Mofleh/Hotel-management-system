using HotelDataAceess.Entiteis;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection.Emit;
using HotelDataAceess.Enums;

namespace HotelDataAceess.Configrations
{
    public class PersonConfig : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.HasKey(e => e.PersonId).HasName("PK__People__AA2FFB8504A21DDD");


            builder.Property(e => e.PersonId).HasColumnName("PersonID");
            builder.Property(e => e.FullName).HasMaxLength(100);
            builder.Property(e => e.BirthDate).HasColumnType("datetime");
            builder.Property(e => e.Gender)
            .HasConversion(
                v => (byte)v, // Convert enum to byte for the database
                v => (Gender)v // Convert byte to enum when reading from the database
            )
            .HasComment("0 => Male \r\n1 => Female"); 
            
            builder.Property(e => e.NationalityCountryId).HasColumnName("NationalityCountryID");
            builder.Property(e => e.Phone).HasMaxLength(14);

            builder.HasOne(d => d.NationalityCountry).WithMany(p => p.People)
                    .HasForeignKey(d => d.NationalityCountryId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__People__National__3B75D760");

        }

    }
}