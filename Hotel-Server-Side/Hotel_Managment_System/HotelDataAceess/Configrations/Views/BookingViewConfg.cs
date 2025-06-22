using HotelDataAceess.Entiteis;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HotelDataAceess.Entiteis.Views;

namespace HotelDataAceess.Configrations.Views
{
    public class BookingViewConfg : IEntityTypeConfiguration<BookingView>
    {
        public void Configure(EntityTypeBuilder<BookingView> builder)
        {

            builder.HasNoKey();
            builder.ToView("BookingView");
        }
    }
}
