using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CardController : Controller
{
    MythicalDbContext _dbContext;
    public CardController(MythicalDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<string>>> Get()
    {
        return Ok(
            await _dbContext.Cards.Include(c => c.AnimalClass)
            .Include(c => c.Artist)
            .Include(c => c.Family)
            .Include(c => c.Size)
            .ToListAsync()
        );
    }
}