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

  [HttpPost("")]
  public async Task<ActionResult> CreateTour([FromBody] TourDTO tour)
  {
    try
    {
      var t = await tourService.AddTour(tour);
      return Ok(t);

    }
    catch (Exception e)
    {
      return Conflict(e.Message);
    }
  }
  
  [HttpGet("{id}")]
  public async Task<ActionResult> GetTour([FromQuery] int id)
  {
    return Conflict("Not Implemented");
    
    throw new NotImplementedException("Tours not implemented yet.");
  }
  
  
  [HttpGet("")]
  public async Task<ActionResult> GetTours()
  {
    return Conflict("Not Implemented");
    
    throw new NotImplementedException("Tours not implemented yet.");
  }
  
  [HttpPut("{id}")]
  public async Task<ActionResult> UpdateTour([FromQuery] int id)
  {
    return Conflict("Not Implemented");
    
    throw new NotImplementedException("Tours not implemented yet.");
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteTour([FromQuery] int id)
  {
    return Conflict("Not Implemented");
    
    throw new NotImplementedException("Tours not implemented yet.");
  }

  
}