using Microsoft.EntityFrameworkCore;
using MovieApi.Models;

namespace MovieApi.DAL
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options):base(options) { }

        public DbSet<Actor> Actors { get; set; }
    }
}
