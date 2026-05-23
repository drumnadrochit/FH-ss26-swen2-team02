using TourPlanner.Entities;
using TourPlanner.Repositories;

namespace TourPlanner.Services;

public class UserService
{
    private readonly UserRepository _userRepository;

    public UserService(UserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    public async Task<User> GetUserByUsername(string username)
    {
        var user = await _userRepository.GetUserByUsername(username) ?? throw new UserNotFoundException($"User with username '{username}' not found.");

        return user;
    }

    public async Task<User> RegisterUser(string username, string password)
    {
        var user = new User
        {
            Username = username,
            Password = password
        };

        try
        {
            await _userRepository.AddUser(user);
        }
        catch (Exception e)
        {
            throw new UserAlreadyExistsException($"User with username '{username}' already exists.", e);
        }
        
        return user;
    }
}