namespace TourPlanner.Services;

public class IncorrectCredentialsException : Exception
{
    public IncorrectCredentialsException(string message) : base(message) { }
}