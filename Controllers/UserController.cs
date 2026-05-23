using Microsoft.AspNetCore.Mvc;
using TourPlanner.API.DTO;
using TourPlanner.Entities;
using TourPlanner.Services;

namespace TourPlanner.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserService _userService;
    
    public AuthController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet("login")]
    public async Task<ActionResult> Get()
    {
        return Ok("you are logged in");
    }
    
    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] CredentialsDTO credentials)
    {
        try
        {
            var user = await _userService.RegisterUser(credentials.Username, credentials.Password);
            return Created();
        }
        catch (Exception e)
        {
            return Conflict("Username already exists");
        }
    }
}