using System;
using System.Collections.Generic;

namespace api.Models;

public partial class GameOverride
{
    public int Id { get; set; }

    public int GameId { get; set; }

    public int CardId { get; set; }

    public int OverrideId { get; set; }

    public string ActualValue { get; set; } = null!;

    public virtual Card Card { get; set; } = null!;

    public virtual Game Game { get; set; } = null!;

    public virtual Override Override { get; set; } = null!;
}
