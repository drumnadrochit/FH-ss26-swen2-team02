namespace TourPlanner.API.DTO;

public enum ErrorType
{
    Client,
    Server
}

public class ErrorDTO
{
    public required string Message { get; set; }
    public required ErrorType ErrorType { get; set; } 
}