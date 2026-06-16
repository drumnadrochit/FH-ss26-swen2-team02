using Microsoft.EntityFrameworkCore;
using TourPlanner.Entities;

namespace TourPlanner;

public class AppDBC : DbContext
{
    public DbSet<Tour> Tours { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<TourLog> TourLogs { get; set; } 


    public AppDBC(DbContextOptions<AppDBC> options) : base(options)
    {
    }
    
}