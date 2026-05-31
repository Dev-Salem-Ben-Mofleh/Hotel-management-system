using HotelDataAceess.Data;
using HotelDataAceess.Entiteis;
using HotelDataAceess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelDataAceess.Repository.Implements
{
    public class CountryRepositry(HotelDbContext dbContext) : GenericRepository<Country>(dbContext), ICountryRepositry
    {
        private readonly HotelDbContext _dbContext = dbContext;
        public async Task<bool> ExistsAsync(int id) => await _dbContext.Set<Country>().AnyAsync(x => x.CountryId == id);


    }

}
