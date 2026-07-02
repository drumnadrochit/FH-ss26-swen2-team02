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

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] AuthenticationRequestDTO authenticationRequest)
    {
        try
        {
            var token = await _userService.LoginUser(authenticationRequest.Username, authenticationRequest.Password);
            var response = new AuthenticationResponseDTO{AccessToken =  token};
            return Ok(response);
        }
        catch (Exception e)
        {
            var response = new ErrorDTO{ErrorType = ErrorType.Client, Message = "Username or password is incorrect"};
            return Conflict(response);
        }
        return Ok("you are logged in");
    }
    
    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] AuthenticationRequestDTO authenticationRequest)
    {
        try
        {
            var user = await _userService.RegisterUser(authenticationRequest.Username, authenticationRequest.Password);
            return Created();
        }
        catch (Exception e)
        {
            var response = new ErrorDTO{ErrorType = ErrorType.Client, Message = "Username already exists"};
            
            return Conflict(response);
        }
    }
}