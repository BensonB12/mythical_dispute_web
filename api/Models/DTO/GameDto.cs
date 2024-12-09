namespace api.Models;

public class GameDto
{
    public int Id { get; set; }

    public int? WinnerId { get; set; }

    public bool IsOver { get; set; }

    public string? JoinCode { get; set; }

    public int? PlayersTurnId { get; set; }

    public int? OtherPlayerId { get; set; }

    public CardZone? CardIdsInGame { get; set; }
}