using HotelDataAceess.Data;
using HotelDataAceess.Repository.Implements;
using HotelDataAceess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;
using System.Threading.Tasks;

namespace HotelDataAceess.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly HotelDbContext _context;
        private IDbContextTransaction _transaction;

        public IPaymentRepositry payment { get; private set; }
        public IBookingRepositry booking { get; private set; }

        public UnitOfWork(HotelDbContext context)
        {
            _context = context;
            payment = new PaymentRepositry(_context);
            booking = new BookingRepositry(_context);
        }

        public async Task<int> CompleteAsync() => await _context.SaveChangesAsync();

        public async Task BeginTransactionAsync()
        {
            if (_transaction == null)
                _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitAsync()
        {
            if (_transaction != null)
            {
                await _transaction.CommitAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public async Task RollbackAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public async void Dispose() => await _context.DisposeAsync();
    }
}
