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
        var logs = await dbc.TourLogs.Where(tl => tl.TourId == tourId).ToListAsync();
        
        if(logs == null || logs.Count == 0) throw new NotFoundException("Could not find any tour-logs");
        
        return logs;
    }

    public async Task<TourLog> AddTourLog(TourLog tourLog)
    {
        await dbc.TourLogs.AddAsync(tourLog);
        await dbc.SaveChangesAsync();
        return tourLog;
    }

    public async Task<TourLog> UpdateTourLog(TourLog tourLog)
    {
        try
        {
            dbc.TourLogs.Update(tourLog);
            await dbc.SaveChangesAsync();
            return tourLog;

        }
        catch (Exception e)
        {
            throw new NotFoundException("Could not find tour-log");
        }
    }

    public async Task DeleteTourLog(int tourLogId, int tourId)
    {
        var tourLog = await dbc.TourLogs.Where(t => t.Id == tourLogId && t.TourId == tourId ).FirstOrDefaultAsync();
        
        if (tourLog == null)
        {
            throw new NotFoundException("Could not find tour-log");
        }
        
        dbc.TourLogs.Remove(tourLog);
        await dbc.SaveChangesAsync();
    }
}