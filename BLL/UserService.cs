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
    
    public UserService(UserRepository userRepository, IConfiguration configurationManager)
    {
        _userRepository = userRepository;
        _configurationManager = configurationManager;
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
                await _userRepository.AddUser(user);
                
            }
            else
            {
                throw new Exception($"User with username '{username}' already exists.");
            }
        }
        catch (Exception e)
        {
            throw new UserAlreadyExistsException($"User with username '{username}' already exists.", e);
        }
        
        return user;
    }

    public async Task<string> LoginUser(string username, string password)
    {
        var user = new User { Username = username, Password = password };

        try
        {
            var match = await _userRepository.GetUserByUsername(username);
            if (match == null) throw new Exception($"User with username '{username}' does not exist.");
            if (!match.Password.Equals(password))
                throw new Exception($"User with username '{username}' does not match password.");

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
            
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        catch (Exception e)
        {
            throw new Exception($"User with username '{username}' does not exist.", e);
        }
        
    }
}