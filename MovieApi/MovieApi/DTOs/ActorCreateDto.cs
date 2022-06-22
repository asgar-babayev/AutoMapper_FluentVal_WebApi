using Microsoft.AspNetCore.Http;

namespace MovieApi.DTOs
{
    public class ActorCreateDto
    {
        public string FullName { get; set; }
        public string ImageUrl { get; set; }
        public bool IsDeleted { get; set; }
    }
}
