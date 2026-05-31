using HotelDataAceess.Entiteis;
using System.Linq.Expressions;

namespace HotelDataAceess.Repository.Interfaces
{
    public interface IPersonRepository : IGenericRepository<Person>
    {
        Task<bool> ExistsAsync(int id);
        Task<IEnumerable<Person>> GetAllPersonAsync();

        Task<IEnumerable<Person>> PagerPersonsUsingPageNumber(short pageNumber, int pageSize, Expression<Func<Person, bool>> predicate);
        Task<Person> GetPersonByNameAsync(string Name);

    }
}
