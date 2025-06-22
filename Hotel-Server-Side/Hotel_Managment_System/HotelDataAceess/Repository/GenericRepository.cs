using HotelDataAceess.Data;
using HotelDataAceess.Entiteis;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelDataAceess.Repository
{
    public class GenericRepository<T>:IGenericRepository<T> where T : class
    {
        private readonly HotelDbContext _dbContext;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(HotelDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.AsNoTracking().ToListAsync();
        public async Task<T> GetByIdAsync(int id )=> await _dbSet.FindAsync(id);
        public async Task <T>AddAsync(T entity)
        {
            try
            {
                await _dbSet.AddAsync(entity);
                await _dbContext.SaveChangesAsync();
                return entity;
            }
            catch (DbUpdateException ex)
            {
                var errorMessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                throw new Exception($"Database update failed: {errorMessage}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"An unexpected error occurred: {ex.Message}", ex);
            }
        }
        public async Task<T> UpdateAsync(int id, T entity)
        {
            try
            {

                _dbSet.Update(entity);
                await _dbContext.SaveChangesAsync();
                return entity;
            }
            catch (DbUpdateException dbEx)
            {
                throw new Exception($"Database update failed: {dbEx.InnerException?.Message ?? dbEx.Message}", dbEx);
            }
            catch (Exception ex)
            {
                throw new Exception($"An unexpected error occurred while updating Entity with ID {id}: {ex.Message}", ex);
            }
        }
        public async  Task<bool> DeleteAsync(int id)
        {
            var existingEntity = await _dbSet.FindAsync(id);
            if (existingEntity != null)
            {
                _dbSet.Remove(existingEntity);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task<int> Count() => await _dbSet.CountAsync();

    }
}
