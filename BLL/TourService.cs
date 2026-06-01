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

    public async Task<TourDTO> AddTour(TourDTO tour)
    {
        var t = mapper.Map<Tour>(tour);
        var tourReturn = await tourRepository.AddTour(t);
        var dto = mapper.Map<TourDTO>(tourReturn);
        return  dto;
    }

    public async Task<Tour?> GetTour(int tourId, int userId)
    {
        return await tourRepository.GetTourById(userId, tourId);
    }

    public async Task<List<Tour>> GetTours(int userId)
    {
        return await tourRepository.GetAllTours(userId);
    }

    public async Task<Tour> UpdateTour(Tour tour)
    {
        return await tourRepository.UpdateTour(tour);        
    }

    public async Task DeleteTour(int tourId)
    { 
        await tourRepository.DeleteTour(tourId);
    }
}