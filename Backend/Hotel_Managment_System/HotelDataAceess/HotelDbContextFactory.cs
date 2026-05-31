using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using HotelDataAceess.Data;

public class HotelDbContextFactory : IDesignTimeDbContextFactory<HotelDbContext>
{
    public HotelDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<HotelDbContext>();

        optionsBuilder.UseSqlServer("Server=localhost;Database=Hotel_DB2;User Id=sa;Password=sa123456;Encrypt=False;TrustServerCertificate=True;Connection Timeout=30;");

        return new HotelDbContext(optionsBuilder.Options);
    }
}
