using Microsoft.EntityFrameworkCore;
using TourPlanner.DAL;
using TourPlanner.Entities;

namespace TourPlanner.Repositories;

public class TourRepository : BaseRepository
{

    public TourRepository(AppDBC dbc) : base(dbc)
    {
        
    }
    
    public async Task<List<Tour>> GetAllTours(int userId)
    {
        var tours =  await dbc.Tours.Include(t => t.Logs).Where(t => t.UserId == userId).ToListAsync();
        if(tours == null || tours.Count == 0) throw new NotFoundException($"Could not find any tours in user {userId}");
        return tours;
    }

    public async Task<Tour?> GetTourById(int userId, int id)
    {
        try
        {
            Tour tour = await dbc.Tours.Include(t => t.User).Include(t => t.Logs).Where(t => t.UserId == userId && t.Id == id).SingleOrDefaultAsync();
            if(tour == null) throw new NotFoundException($"Could not find tour {id} in user {userId}");
            return tour;
        }
        catch (Exception e)
        {
            throw new NotFoundException($"Could not find tour {id} in user {userId}");
        }
    }

    public async Task<Tour> AddTour( Tour tour)
    {
        await dbc.Tours.AddAsync(tour);
        await dbc.SaveChangesAsync();
        return tour;
    }

    public async Task<Tour> UpdateTour(Tour tour)
    {
        try
        {
            dbc.Tours.Update(tour);
            await dbc.SaveChangesAsync();
            return tour;

        }
        catch (Exception e)
        {
            throw new NotFoundException($"Could not find tour {tour.Id} in user {tour.UserId}");
        }
    }

    public async Task DeleteTour(int tourId, int userId)
    {
        Tour? tour = await dbc.Tours.Where(t => t.Id == tourId && t.UserId == userId ).SingleOrDefaultAsync();
        
        if(tour == null)
        {
            throw new NotFoundException($"Could not find tour {tourId} in user {userId}");
        }

        
        dbc.Tours.Remove(tour);
        await dbc.SaveChangesAsync();

    }
}