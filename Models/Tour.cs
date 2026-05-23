namespace TourPlanner.Entities;

public class Tour
{
    /// <summary>
    /// PK
    /// </summary>
    public int Id { get; set; }
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
    public int TransportType { get; set; }
    /// <summary>
    /// Estimated distance of the route, in km.
    /// </summary>
    public float Distance { get; set; }
    /// <summary>
    /// Estimated time of the route, in h.
    /// </summary>
    public float Time { get; set; }
}