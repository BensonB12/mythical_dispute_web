using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CardController : Controller
{
    [HttpGet("all")]
    public ActionResult<IEnumerable<string>> Get()
    {
        IEnumerable<string> cards = ["card1", "card2"];
        return Ok(cards);
    }
}