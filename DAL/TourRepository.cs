using Microsoft.EntityFrameworkCore;
using TourPlanner.Entities;

namespace TourPlanner.Repositories;

public class TourRepository : BaseRepository
{

    public TourRepository(AppDBC dbc) : base(dbc)
    {
        
    }
    
    public async Task<List<Tour>> GetAllTours(int userId)
    {
        return  await dbc.Tours.Where(t => t.UserId == userId).ToListAsync();
    }

    public async Task<Tour?> GetTourById(int userId, int id)
    {
        return await dbc.Tours.Include(t => t.User).Where(t => t.UserId == userId && t.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Tour> AddTour( Tour tour)
    {
        await dbc.Tours.AddAsync(tour);
        await dbc.SaveChangesAsync();
        return tour;
    }

    public async Task<Tour> UpdateTour(Tour tour)
    {
        dbc.Tours.Update(tour);
        await dbc.SaveChangesAsync();
        return tour;
    }

    public async Task DeleteTour(int tourId, int userId)
    {
        var tour = await dbc.Tours.Where(t => t.Id == tourId && t.UserId == userId ).FirstOrDefaultAsync();
        
        if (tour == null)
        {
            throw new Exception("Tour not found");
        }
        
        dbc.Tours.Remove(tour);
        await dbc.SaveChangesAsync();

    }
}