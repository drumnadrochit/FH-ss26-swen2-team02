using System.ComponentModel.DataAnnotations;

namespace TourPlanner.API.DTO;

public class AuthenticationResponseDTO
{
    public required string AccessToken  { get; set; }
    
}
