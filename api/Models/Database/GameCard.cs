using System;
using System.Collections.Generic;

namespace api.Models;

public partial class GameCard
{
    public int Id { get; set; }

    public int GameId { get; set; }

    public int CardId { get; set; }

    public int CardZoneId { get; set; }

    public virtual Card Card { get; set; } = null!;

    public virtual CardZone CardZone { get; set; } = null!;

    public virtual Game Game { get; set; } = null!;
}
