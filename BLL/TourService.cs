using AutoMapper;
using TourPlanner.API.DTO;
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
    
    public TourService(TourRepository tourRepository, IMapper mapper)
    {
        this.tourRepository = tourRepository;
        this.mapper = mapper;
    }

    public async Task<TourDTO> AddTour(int userId, TourDTO tour)
    {
        tour.UserId = userId;
        
        var t = mapper.Map<Tour>(tour);
        var tourReturn = await tourRepository.AddTour(t);
        var dto = mapper.Map<TourDTO>(tourReturn);
        return  dto;
    }

    public async Task<TourDTO?> GetTour(int tourId, int userId)
    {
        var t = await tourRepository.GetTourById(userId, tourId);
        var dto = mapper.Map<TourDTO>(t);
        return dto;
    }

    public async Task<List<TourDTO>> GetTours(int userId)
    {
        var tours = await tourRepository.GetAllTours(userId);
        var dto = mapper.Map<List<TourDTO>>(tours);
        return dto;
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
        var tNew = await tourRepository.UpdateTour(t);
        var dto = mapper.Map<TourDTO>(tNew);
        return dto;        
    }

    public async Task DeleteTour(int tourId, int userId)
    { 
        await tourRepository.DeleteTour(tourId,userId);
    }
}