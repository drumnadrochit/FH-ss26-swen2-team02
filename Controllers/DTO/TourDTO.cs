using System.ComponentModel.DataAnnotations;
using System.Numerics;
using TourPlanner.Entities;

namespace TourPlanner.API.DTO;



public class TourDTO
{
    public int? Id {get; set;}
    
    [Required]
    public required string Title {get; set;}
    
    public string? Description {get; set;}
    
    [Required]
    public Location From  {get; set;}
    
    [Required]
    public Location To {get; set;}
    
    
    public int? UserId { get; set; }
    
    [Required]
    public string Type {get; set;}
    
    [Required]
    public float Distance {get; set;}
    
    [Required]
    public float Duration {get; set;}
    
    public LogResponseDTO[]? Logs {get; set;}
}
