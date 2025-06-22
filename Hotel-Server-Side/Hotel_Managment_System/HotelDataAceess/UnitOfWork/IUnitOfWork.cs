using HotelDataAceess.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelDataAceess.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IPaymentRepositry payment { get; }
        IBookingRepositry booking { get; }
        Task<int> CompleteAsync();
        Task BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }
}
