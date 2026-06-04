namespace TourPlanner.Entities;

public enum Difficulty
{
    Easy,
    Normal,
    Hard
}

public class TourLog
{
    public int Id { get; set; }

    public Tour Tour { get; set; }
    public int TourId { get; set; }
    public DateTime CreationTime { get; set; }
    public string Comment  { get; set; }
    public Difficulty Difficulty { get; set; }
    public float Distance { get; set; }
    public float Duration { get; set; }
    public int Rating { get; set; }
}