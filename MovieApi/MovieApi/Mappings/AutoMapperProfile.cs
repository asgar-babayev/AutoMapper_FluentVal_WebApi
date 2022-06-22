using AutoMapper;
using MovieApi.DTOs;
using MovieApi.Models;

namespace MovieApi.Mappings
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Actor,ActorCreateDto>().ReverseMap();
            CreateMap<Actor,ActorCreateDto>().ReverseMap();
            CreateMap<Actor,ActorGetDto>().ReverseMap();
        }
    }
}
