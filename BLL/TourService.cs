using System.Diagnostics;
using AutoMapper;
using TourPlanner.API.DTO;
using TourPlanner.DAL;
using TourPlanner.Entities;
using TourPlanner.Repositories;

namespace TourPlanner.Services;

/// <summary>
/// CRUD
/// Create
/// Read
/// Update
/// Delete
/// </summary>
public class TourService
{
    private readonly  TourRepository tourRepository;
    private readonly IMapper mapper;
    private readonly ILogger<TourService> logger;
    
    public TourService(TourRepository tourRepository, IMapper mapper,  ILogger<TourService> logger)
    {
        this.tourRepository = tourRepository;
        this.mapper = mapper;
        this.logger = logger;
    }

    public async Task<TourDTO> AddTour(int userId, TourDTO tour)
    {

        try
        {
            tour.UserId = userId;
            var t = mapper.Map<Tour>(tour);
            var tourReturn = await tourRepository.AddTour(t);
            logger.LogInformation($"Added tour {tourReturn.Id} to user {tourReturn.UserId}");
            
            var dto = mapper.Map<TourDTO>(tourReturn);
            Console.WriteLine(dto);
            return  dto;

        }
        catch (Exception e)
        {
            logger.LogError($"Failed adding  tour {tour.Id} to user {userId}",e);
            throw e;
        }
    }

    public async Task<TourDTO?> GetTour(int tourId, int userId)
    {
        try
        {
            var t = await tourRepository.GetTourById(userId, tourId);
            logger.LogInformation($"Fetched tour {tourId} from user {userId}");
            var dto = mapper.Map<TourDTO>(t);
            return dto;

        }
        catch (Exception e)
        {
            logger.LogError($"Failed fetching tour {tourId} from user {userId}",e);
            throw e;
        }
    }

    public async Task<List<TourDTO>> GetTours(int userId)
    {
        try
        {
            var tours = await tourRepository.GetAllTours(userId);
            logger.LogInformation($"Fetched tours from user {userId}");
            
            var dto = mapper.Map<List<TourDTO>>(tours);
            return dto;

        }
        catch (Exception e)
        {
            logger.LogError($"Failed fetching tours from user {userId}",e);
            
            throw e;
        }
    }

    /// <summary>
    /// TODO this should also export associated tour logs
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public async Task<List<TourDTO>> ExportTours(int userId)
    {
        var tours = await tourRepository.GetAllTours(userId);
        var dto = mapper.Map<List<TourDTO>>(tours);
        return dto;
    }

    public async Task ImportTours(List<TourDTO> tours, int userId)
    {
        foreach (var dto in tours)
        {
            foreach (var log in dto.Logs)
            {
                log.Id = null;
            }
            dto.Id = null;
            dto.UserId = userId;
            var tour = mapper.Map<Tour>(dto);
            await tourRepository.AddTour(tour);
        }
    }
    
    public async Task<TourDTO> UpdateTour(TourDTO tour, int tourId, int userId)
    {
        tour.Id = tourId;
        tour.UserId = userId;
        var t = mapper.Map<Tour>(tour);
        try
        {
            var tNew = await tourRepository.UpdateTour(t);
            logger.LogInformation($"Updated tour {tourId} in user {userId}");
            
            var dto = mapper.Map<TourDTO>(tNew);
            return dto;        

        }
        catch (Exception e)
        {
            logger.LogError($"Failed updating tour {tourId} in user {userId}",e);
            throw e;
        }
    }

    public async Task DeleteTour(int tourId, int userId)
    {
        try
        {
            await tourRepository.DeleteTour(tourId,userId);
            logger.LogInformation($"Deleted tour {tourId} in user {userId}");
            
        }
        catch (Exception e)
        {
            logger.LogError($"Failed deleting tour {tourId} in user {userId}",e);
            throw e;
        }
    }
}