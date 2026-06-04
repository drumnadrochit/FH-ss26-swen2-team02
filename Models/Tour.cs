using System.ComponentModel.DataAnnotations.Schema;

namespace TourPlanner.Entities;

public enum TransportTypes
{
    Hike,
    Bike
}

public class Tour
{
    /// <summary>
    /// PK
    /// </summary>
    public int Id { get; set; }
    
    public User User { get; set; }
    
    public ICollection<TourLog> Logs { get; set; }
    
    
    /// <summary>
    /// FK -> User
    /// </summary>
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    
    /// <summary>
    /// Name of the tour
    /// </summary>
    public string Name { get; set; }
    /// <summary>
    /// Description of the tour
    /// </summary>
    public string Description { get; set; }
    /// <summary>
    /// Starting location of the route
    /// </summary>
    public string From { get; set; }
    /// <summary>
    /// End location of the route
    /// </summary>
    public string To { get; set; }
    /// <summary>
    /// Transportation type used, eg. walking or biking
    /// </summary>
    public TransportTypes TransportType { get; set; }
    /// <summary>
    /// Estimated distance of the route, in km.
    /// </summary>
    public float Distance { get; set; }
    /// <summary>
    /// Estimated time of the route, in h.
    /// </summary>
    public float Duration { get; set; }
}