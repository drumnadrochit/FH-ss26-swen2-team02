namespace TourPlanner.Repositories;

/// <summary>
/// Base Repository class
/// </summary>
public class BaseRepository
{
    /// <summary>
    /// Database context used for database operations
    /// </summary>
    protected readonly AppDBC dbc;

    public BaseRepository(AppDBC dbc)
    {
        this.dbc = dbc;
    }
}