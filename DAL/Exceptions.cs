namespace TourPlanner.DAL;


public class NotFoundException : Exception
{
    public NotFoundException(string msg) : base(msg)
    {
    }
}

public class BussinessLogicException : Exception
{
    public BussinessLogicException(string message) : base(message)
    {}
}