using HotelDataAceess.Entiteis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelDataAceess.Repository.Interfaces
{
    public interface ICountryRepositry: IGenericRepository<Country>
    {
        Task<bool> ExistsAsync(int id);

    }
}
