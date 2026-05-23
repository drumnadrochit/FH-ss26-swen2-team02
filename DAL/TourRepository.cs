using Microsoft.EntityFrameworkCore;
using TourPlanner.Entities;

namespace TourPlanner.Repositories;

public class TourRepository : BaseRepository
{

    public TourRepository(AppDBC dbc) : base(dbc)
    {
        
    }
    
    public async Task<IEnumerable<Tour>> GetAllTours(string username)
    {
        // return await dbc.Tours.AsNoTracking().Where(t => t.)
        throw new NotImplementedException();
    }

    public Task<Tour?> GetTourById(string username, int id)
    {
        throw new NotImplementedException();
    }

    public Task AddTour(string username, Tour tour)
    {
        throw new NotImplementedException();
    }

    public Task UpdateTour(string username, Tour tour)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteTour(string username, Tour tour)
    {
        throw new NotImplementedException();
    }
}