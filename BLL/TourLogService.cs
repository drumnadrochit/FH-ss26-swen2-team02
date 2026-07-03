using AutoMapper;
using TourPlanner.API.DTO;
using TourPlanner.DAL;
using TourPlanner.Entities;

namespace TourPlanner.Services;

public class TourLogService
{
    private readonly TourLogRepository _logRepo;
    private readonly IMapper _mapper;
    private readonly ILogger<TourLogService> _logger;

    public TourLogService(TourLogRepository repo, IMapper mapper,  ILogger<TourLogService> logger)
    {
        _logRepo = repo;
        _mapper = mapper;
        _logger = logger;
    }

    // Create tour log
    public async Task<LogResponseDTO> AddTourLog(LogRequestDTO logRequestDto)
    {
        try
        {
            var tl = _mapper.Map<TourLog>(logRequestDto);
            var tlReturn = await _logRepo.AddTourLog(tl);
            _logger.LogInformation($"Added tour-log {tlReturn.Id} to tour {tlReturn.TourId}");
            var dto = _mapper.Map<LogResponseDTO>(tlReturn);
            return dto;

        }
        catch (Exception e)
        {
            _logger.LogError($"Failed adding tour-log to tour {logRequestDto.TourId}",e);
            throw new NotFoundException("Could not find tour");
        }
    }

    public async Task<LogResponseDTO> UpdateTour(LogRequestDTO logRequest, int tourLogId)
    {
        try
        {
            logRequest.Id = tourLogId;
            var tl = _mapper.Map<TourLog>(logRequest);
            var tlNew = await _logRepo.UpdateTourLog(tl);
            _logger.LogInformation($"Updated tour-log {tlNew.Id} in tour {tlNew.TourId}");
            
            var dto = _mapper.Map<LogResponseDTO>(tlNew);
            return dto;

        }
        catch (Exception e)
        {
            _logger.LogError($"Failed updating tour-log {logRequest.Id} in tour {logRequest.TourId}", e);
            
            throw;
        }
    }

    // Delete tour log
    public async Task DeleteTourLog(int tourLogId, TourLogDeleteDTO tourId)
    {
        try
        {
            var tId = tourId.TourId;
            await _logRepo.DeleteTourLog(tourLogId, tId);
            _logger.LogInformation($"Deleted tour-log {tourLogId} in tour {tId}");
        }
        catch (Exception e)
        {
            _logger.LogError($"Failed deleting tour-log {tourLogId} in tour {tourId}", e);
            throw e;
        }
    }
}