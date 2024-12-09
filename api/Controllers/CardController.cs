using System.Reflection.Metadata.Ecma335;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

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
    public async Task<ActionResult<IEnumerable<CardDTO>>> Get()
    {
        return Ok(
            await _dbContext.Cards.Select(c =>
                new CardDTO()
                {
                    Id = c.Id,
                    CardName = c.CardName,
                    AnimalClass = c.AnimalClass.ClassName,
                    Family = c.Family.FamilyName,
                    Size = c.Size.SizeDisplay,
                    AirValue = c.AirValue,
                    LandValue = c.LandValue,
                    WaterValue = c.WaterValue,
                    TextBox = c.TextBox,
                    ImgUrl = c.ImgUrl,
                    ArtistName = c.Artist != null ? c.Artist.ArtistName : null
                }
            )
            .ToListAsync()
        );
    }
}