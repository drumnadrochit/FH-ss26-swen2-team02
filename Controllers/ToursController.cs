using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TourPlanner.API.DTO;
using TourPlanner.Services;

namespace TourPlanner.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ToursController : ControllerBase
{
  private readonly TourService tourService;

  public ToursController(TourService tourService)
  {
    this.tourService = tourService;
  }

  private int GetUserIdFromToken()
  {
    return int.Parse(User.FindFirstValue(ClaimTypes.Name));
  }
  
  [HttpPost("")]
  public async Task<ActionResult> CreateTour([FromBody] TourDTO tour)
  {
    try
    {
      var t = await tourService.AddTour(GetUserIdFromToken() ,tour);
      return Ok(t);

    }
    catch (Exception e)
    {
      return Conflict(e.Message);
    }
  }
  
  [HttpGet("{id}")]
  public async Task<ActionResult> GetTour(int id)
  {
    try
    {
      var t = await tourService.GetTour(id, GetUserIdFromToken());
      return Ok(t);
    }
    catch (Exception e)
    {
      return Conflict("Not Implemented");
    }
  }
  
  
  [HttpGet("")]
  public async Task<ActionResult> GetTours()
  {
    try
    {
      var tours = await tourService.GetTours(GetUserIdFromToken());
      return Ok(tours);
    }
    catch (Exception e)
    {
      return Conflict(e.Message);
    }
  }
  
  [HttpPut("{id}")]
  public async Task<ActionResult> UpdateTour([FromBody] TourDTO tour, int id)
  {
    try
    {
      var t = await tourService.UpdateTour(tour, id, GetUserIdFromToken());
      return Ok(t);
    }
    catch (Exception e)
    {
      return Conflict(e.Message);
    }
    
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteTour(int id)
  {
    try
    {
      await tourService.DeleteTour(id, GetUserIdFromToken());
      return Ok();
    }
    catch (Exception e)
    {
      return Conflict(e);
    }
    
  }

  
}