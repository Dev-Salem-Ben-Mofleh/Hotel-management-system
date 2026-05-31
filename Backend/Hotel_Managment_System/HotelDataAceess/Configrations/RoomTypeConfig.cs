using HotelDataAceess.Entiteis;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelDataAceess.Configrations
{
    internal class RoomTypeConfig : IEntityTypeConfiguration<RoomType>
    {
        public void Configure(EntityTypeBuilder<RoomType> builder)
        {
            builder.HasKey(e => e.RoomTypeId).HasName("PK__RoomType__BCC89611C6B4CBBE");

            builder.HasIndex(e => e.RoomTypeTitle, "UQ__RoomType__E37A7CB411ACF533").IsUnique();

            builder.Property(e => e.RoomTypeId).HasColumnName("RoomTypeID");
            builder.Property(e => e.RoomTypeDescription).HasMaxLength(500);
            builder.Property(e => e.RoomTypePricePerNight).HasColumnType("smallmoney");
            builder.Property(e => e.RoomTypeTitle).HasMaxLength(50);

        }
    }
}
