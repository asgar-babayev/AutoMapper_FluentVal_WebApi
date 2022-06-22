using Microsoft.AspNetCore.Http;

namespace MovieApi.DTOs
{
    public class ActorUpdateDto
    {
        public string FullName { get; set; }
        public string ImageUrl { get; set; }
    }
}
