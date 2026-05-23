using Microsoft.EntityFrameworkCore;
using TourPlanner.Repositories;
using TourPlanner.Services;

namespace TourPlanner;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddAuthorization();

        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        builder.Services.AddScoped<UserRepository>();
        builder.Services.AddScoped<UserService>();


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