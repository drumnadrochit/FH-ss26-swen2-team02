using System.ComponentModel.DataAnnotations.Schema;

namespace TourPlanner.Entities;

public enum TourType
{
    Hike,
    Bike
}

public class Location
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Address { get; set; }

}


public class Tour
{
    /// <summary>
    /// PK
    /// </summary>
    public int Id { get; set; }
    
    public User User { get; set; }
    
    public ICollection<TourLog> Logs { get; set; } = new List<TourLog>();
    
    
    /// <summary>
    /// FK -> User
    /// </summary>
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    
    /// <summary>
    /// Name of the tour
    /// </summary>
    public string Title { get; set; }
    /// <summary>
    /// Description of the tour
    /// </summary>
    public string Description { get; set; }
    /// <summary>
    /// Starting location of the route
    /// </summary>
    public Location From { get; set; }
    /// <summary>
    /// End location of the route
    /// </summary>
    public Location To { get; set; }
    /// <summary>
    /// Transportation type used, eg. walking or biking
    /// </summary>
    public string Type { get; set; }
    /// <summary>
    /// Estimated distance of the route, in km.
    /// </summary>
    public float Distance { get; set; }
    /// <summary>
    /// Estimated time of the route, in h.
    /// </summary>
    public float Duration { get; set; }
    
 
}