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
    public class RoomConfig : IEntityTypeConfiguration<Room>
    {
        public void Configure(EntityTypeBuilder<Room> builder)
        {

            builder.HasKey(e => e.RoomId).HasName("PK__Rooms__32863919B4265D84");

            builder.Property(e => e.RoomId).HasColumnName("RoomID");
            builder.Property(e => e.AdditionalNotes).HasMaxLength(500);
            builder.Property(e => e.RoomNumber).HasMaxLength(10);
            builder.Property(e => e.RoomSize).HasColumnType("decimal(6, 2)");
            builder.Property(e => e.RoomTypeId).HasColumnName("RoomTypeID");
            builder.Property(e => e.RoomImageUrl).HasMaxLength(500);
            builder.Property(e => e.AvailabilityStatus)
            .HasConversion(
                v => (byte)v, // Convert enum to byte for the database
                v => (AvailabilityStatus)v // Convert byte to enum when reading from the database
            )
            .HasComment("0 => Available \r\n1 => Unavailable \r\n1 => underMaintenance"); 


            builder.HasOne(d => d.RoomType).WithMany(p => p.Rooms)
                    .HasForeignKey(d => d.RoomTypeId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__Rooms__RoomTypeI__17036CC0");
        }
    }
}
