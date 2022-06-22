using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieApi.DAL;
using MovieApi.DTOs;
using MovieApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        readonly Context _context;
        readonly IMapper _mapper;

        public ActorController(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<List<ActorGetDto>> GetAll()
        {
            return _mapper.Map<List<ActorGetDto>>(await _context.Actors.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActorGetDto> GetById(int id)
        {
            Actor actor = await _context.Actors.FindAsync(id);
            return _mapper.Map<ActorGetDto>(actor);
        }

        [HttpPost("create")]
        public async Task<ActorCreateDto> Create(ActorCreateDto actorDto)
        {
            await _context.Actors.AddAsync(_mapper.Map<Actor>(actorDto));
            await _context.SaveChangesAsync();
            return actorDto;
        }

        [HttpPut("update/{id}")]
        public async Task<ActorUpdateDto> Update(int id, ActorUpdateDto actorDto)
        {
            Actor actor = await _context.Actors.FindAsync(id);
            actor.FullName = actorDto.FullName;
            actor.ImageUrl = actorDto.ImageUrl;
            _context.SaveChanges();
            return actorDto;
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Actor actor = await _context.Actors.FindAsync(id);
            if (actor == null) return StatusCode(StatusCodes.Status404NotFound);
            _context.Actors.Remove(actor);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
