using Microsoft.EntityFrameworkCore;
using TourPlanner.Entities;

namespace TourPlanner;

public class AppDBC : DbContext
{
    public DbSet<Tour> Tours { get; set; }


    public AppDBC(DbContextOptions<AppDBC> options) : base(options)
    {
    }
    
}