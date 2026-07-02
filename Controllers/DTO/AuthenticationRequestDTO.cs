using System.ComponentModel.DataAnnotations;

namespace TourPlanner.API.DTO;

public class AuthenticationRequestDTO
{
    [Required]
    [StringLength(50, MinimumLength = 3)]
    public required string Username  { get; set; }
    
    [Required]
    [StringLength(30, MinimumLength = 3)]
    [DataType(DataType.Password)]
    public required string Password { get; set; }
}
