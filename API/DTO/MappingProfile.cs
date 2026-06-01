using AutoMapper;
using TourPlanner.Entities;

namespace TourPlanner.API.DTO;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<TourDTO, Tour>().ReverseMap();

    }
}