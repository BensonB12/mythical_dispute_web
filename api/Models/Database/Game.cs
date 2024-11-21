using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Game
{
    public int Id { get; set; }

    public int? WinnerId { get; set; }

    public bool IsOver { get; set; }

    public string? JoinCode { get; set; }

    public int? PlayersTurnId { get; set; }

    public int? OtherPlayerId { get; set; }

    public virtual ICollection<GameCard> GameCards { get; set; } = new List<GameCard>();

    public virtual ICollection<GameOverride> GameOverrides { get; set; } = new List<GameOverride>();

    public virtual MdUser? OtherPlayer { get; set; }

    public virtual MdUser? PlayersTurn { get; set; }

    public virtual MdUser? Winner { get; set; }
}
