namespace TourPlanner.Entities;

public class TourLog
{
    public int Id { get; set; }

    public Tour Tour { get; set; }
    public int TourId { get; set; }
    public DateTime CreationTime { get; set; } = DateTime.UtcNow;
    public string Comment  { get; set; }
    public int Difficulty { get; set; }
    public float Distance { get; set; }
    public float Duration { get; set; }
    public int Rating { get; set; }
}