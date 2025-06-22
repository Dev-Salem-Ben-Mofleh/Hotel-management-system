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
    public class PaymentConfig : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.HasKey(e => e.PaymentId).HasName("PK__Payments__9B556A58F9235C1A");

            builder.Property(e => e.PaymentId).HasColumnName("PaymentID");
            builder.Property(e => e.BookingId).HasColumnName("BookingID");
            builder.Property(e => e.PaidAmount).HasColumnType("smallmoney");
            builder.Property(e => e.PaymentDate).HasColumnType("datetime");

            builder.HasOne(d => d.Booking).WithOne(p => p.Payment)
                    .HasForeignKey<Payment>(x => x.BookingId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__Payments__Bookin__6754599E");


        }
    }
}
