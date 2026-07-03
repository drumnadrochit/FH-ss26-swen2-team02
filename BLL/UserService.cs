using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TourPlanner.Entities;
using TourPlanner.Repositories;
using Microsoft.IdentityModel.Tokens;

namespace TourPlanner.Services;

public class UserService
{
    private readonly UserRepository _userRepository;
    private readonly IConfiguration _configurationManager;
    private readonly ILogger<UserService> logger;

    
    public UserService(UserRepository userRepository, IConfiguration configurationManager, ILogger<UserService> logger)
    {
        _userRepository = userRepository;
        _configurationManager = configurationManager;
        this.logger = logger;
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
            var duplicate =  await _userRepository.GetUserByUsername(username);
            if (duplicate == null)
            {
                var u = await _userRepository.AddUser(user);
                logger.LogInformation($"Registered new user '{u.Username}'");
            }
            else
            {
                throw new UserAlreadyExistsException($"User with username: '{username}' already exists.");
            }
        }
        catch (Exception e)
        {
            logger.LogError($"Failed registration of user {username}",e);
            throw e;
        }
        
        return user;
    }

    public async Task<string> LoginUser(string username, string password)
    {
        var user = new User { Username = username, Password = password };

        try
        {
            var match = await _userRepository.GetUserByUsername(username);
            if (match == null) throw new IncorrectCredentialsException($"Username or password is incorrect.");
            if (!match.Password.Equals(password))
                throw new IncorrectCredentialsException($"Username or password is incorrect.");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, match.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configurationManager["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            
            var token = new JwtSecurityToken(
                issuer: _configurationManager["Jwt:Issuer"],
                audience: _configurationManager["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);
            
            logger.LogInformation($"Logged in user '{match.Username}'");
            
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        catch (Exception e)
        {
            logger.LogError($"Failed logging in user '{username}'",e);
            
            throw e;
        }
        
    }
}