using Microsoft.EntityFrameworkCore;
using TourPlanner.Entities;
using TourPlanner.Repositories;

namespace TourPlanner.DAL;

public class TourLogRepository : BaseRepository
{
    public TourLogRepository(AppDBC dbc) : base(dbc)
    {
    }

    public async Task<List<TourLog>> GetAllTourLog(int tourId)
    {
        return await dbc.TourLogs.Where(tl => tl.TourId == tourId).ToListAsync();
    }

    public async Task<TourLog> AddTourLog(TourLog tourLog)
    {
        await dbc.TourLogs.AddAsync(tourLog);
        await dbc.SaveChangesAsync();
        return tourLog;
    }

    public async Task<TourLog> UpdateTourLog(TourLog tourLog)
    {
        dbc.TourLogs.Update(tourLog);
        await dbc.SaveChangesAsync();
        return tourLog;
    }

    public async Task DeleToursteTourLog(int tourLogId, int tourId)
    {
        var tour = await dbc.Tours.Where(t => t.Id == tourId && t.UserId == tourId ).FirstOrDefaultAsync();
        
        if (tour == null)
        {
            throw new Exception("TourLog not found");
        }
        
        dbc.Tours.Remove(tour);
        await dbc.SaveChangesAsync();
    }
    
}