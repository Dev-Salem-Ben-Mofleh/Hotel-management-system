using HotelDataAceess.Configrations;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Entiteis.Authentication;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelDataAceess.Data
{
    public class HotelDbContext : DbContext
    {

        public HotelDbContext()
        {
        }

        public HotelDbContext(DbContextOptions<HotelDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<Person> People { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<RoomType> RoomTypes { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(BookingConfig).Assembly);

           // OnModelCreatingPartial(modelBuilder);
        }

        // partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
