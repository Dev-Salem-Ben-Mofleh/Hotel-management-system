using HotelDataAceess.Entiteis;
using HotelDataAceess.Repository.Implements;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HotelDataAceess.Repository.Interfaces
{
   public interface IPersonRepository : IGenericRepository<Person>
    {
        Task<bool> ExistsAsync(int id);
        Task<IEnumerable<Person>> GetAllPersonAsync();
        Task<IEnumerable<Person>> PagerPersonsUsingPageNumber(short pageNumber, int pageSize,Expression<Func<Person, bool>> predicate);
        Task<Person> GetPersonByNameAsync(string Name);

    }
}
