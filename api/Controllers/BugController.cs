using System.Reflection.Metadata.Ecma335;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BugController : Controller
{
    MythicalDbContext _dbContext;
    public BugController(MythicalDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("all")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<string>>> Get()
    {
        return Ok(
            await _dbContext.BugReports.Select(b => b.Report).ToListAsync()
        );
    }

    [HttpPost("new")]
    [IgnoreAntiforgeryToken]
    public async Task<ActionResult> Post([FromForm] string report, IFormFile? file)
    {
        var bugReport = new BugReport() { Report = report };

        if (file is not null)
            bugReport.AttachedFile = Utils.Converter.ConvertIFormFileToByteArray(file);

        await _dbContext.BugReports.AddAsync(bugReport);

        Console.WriteLine($"Report: {report}\nHad an attached file: {file is not null}");

        return Ok();
    }
}