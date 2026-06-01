using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TourPlanner.Repositories;
using TourPlanner.Services;

namespace TourPlanner;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        
        // Add services to the container.
        builder.Services.AddAuthorization();

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
        {
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey =
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Jwt:Key").Value)),
                ValidateIssuer = true,
                ValidIssuer = builder.Configuration.GetSection("Jwt:Issuer").Value,
                ValidateAudience = true,
                ValidAudience = builder.Configuration.GetSection("Jwt:Audience").Value,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            options.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = context =>
                {
                    if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                    {
                        context.Response.Headers.Append("Token-Expired", "true");
                    }

                    return Task.CompletedTask;
                }
            };

        });
        
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        builder.Services.AddScoped<UserRepository>();
        builder.Services.AddScoped<UserService>();
        builder.Services.AddScoped<TourRepository>();
        builder.Services.AddScoped<TourService>();


        builder.Services.AddDbContext<AppDBC>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL")));
        builder.Services.AddControllers();
        
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            
            // DEVELOPMENT ONLY
            // this will drop and create new tables, discarding existing db data 
            using ( var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<AppDBC>();
                context.Database.EnsureCreated();
            }
        }

        app.MapControllers();        
        // app.UseHttpsRedirection();

        app.UseAuthorization();
        

        app.Run();
    }
}