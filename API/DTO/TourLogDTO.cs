using System.ComponentModel.DataAnnotations;
using TourPlanner.Entities;

namespace TourPlanner.API.DTO;

public class TourLogDTO
{
    public int? Id { get; set; }
    public int TourId { get; set; }

    public string Comment { get; set; }

    public Difficulty Difficulty { get; set; }

    public float Distance { get; set; }

    public float Duration { get; set; }

    public int Rating { get; set; }
}