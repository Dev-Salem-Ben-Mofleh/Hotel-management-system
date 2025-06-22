using HotelDataAceess.Entiteis;
using HotelDataAceess.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace HotelDataAceess.Configrations
{
    public class BookingConfig : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {

            builder.HasKey(e => e.BookingId).HasName("PK__Bookings__73951ACD4C3DC9AF");

            builder.Property(e => e.BookingId).HasColumnName("BookingID");
            builder.Property(e => e.CheckInDate).HasColumnType("datetime");
            builder.Property(e => e.CheckOutDate).HasColumnType("datetime");
            builder.Property(e => e.Status)
            .HasConversion(
                v => (byte)v, // Convert enum to byte for the database
                v => (Statues)v // Convert byte to enum when reading from the database
            )
            .HasComment("0 => Confirmed \r\n1 => Cancelled"); 

          
            builder.HasOne(d => d.Person).WithMany(p => p.Bookings)
                    .HasForeignKey(x => x.PersonId)
                    .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(d => d.Room).WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.RoomId)
                    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
