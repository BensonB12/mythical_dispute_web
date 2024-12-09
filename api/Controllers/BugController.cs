using System.Reflection.Metadata.Ecma335;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BugController : Controller
{
  MythicalDbContext _dbContext;
  public BugController(MythicalDbContext dbContext)
  {
    _dbContext = dbContext;
  }

  [HttpPost("new")]
  [IgnoreAntiforgeryToken]
  public async Task<ActionResult> Post(IFormFile file, [FromForm] string report)
  {
    await _dbContext.BugReports.AddAsync(new BugReport()
    {
      Report = report,
      AttachedFile = Utils.Converter.ConvertIFormFileToByteArray(file)
    });

    return Ok();
  }
}