namespace api.Models;


public class CardZoneDto
{
    public string? CardZoneValue { get; set; }
    public int? PlayerIdsHand { get; set; }

    public List<int> cardIds { get; set; } = [];
}