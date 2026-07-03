using AutoMapper;
using TourPlanner.Entities;

namespace TourPlanner.API.DTO;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<TourDTO, Tour>().ForMember(t => t.Logs, opt => opt.MapFrom(s => s.Logs));
        CreateMap<Tour, TourDTO>().ForMember(t => t.Logs, opt => opt.MapFrom(s => s.Logs));

        CreateMap<LogRequestDTO,TourLog>().ReverseMap();
        CreateMap<TourLog, LogResponseDTO>().ReverseMap();
        
    }
}