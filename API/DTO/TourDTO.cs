using System.ComponentModel.DataAnnotations;
using System.Numerics;
using TourPlanner.Entities;

namespace TourPlanner.API.DTO;



public class TourDTO
{
    [Required]
    public required string Name {get; set;}
    
    public string? Description {get; set;}
    
    [Required]
    public string From  {get; set;}
    
    [Required]
    public string To {get; set;}
    
    [Required]
    public int UserId { get; set; }
    
    [Required]
    public TransportTypes TransportType {get; set;}
    
    
    public float? Distance {get; set;}
    
    public float? Duration {get; set;}
    
}
