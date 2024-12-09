using System;
using System.Collections.Generic;

namespace api.Models;

public partial class MdUser
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public bool Notifications { get; set; }

    public int? UserColorId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<CardZone> CardZones { get; set; } = new List<CardZone>();

    public virtual ICollection<Game> GameOtherPlayers { get; set; } = new List<Game>();

    public virtual ICollection<Game> GamePlayersTurns { get; set; } = new List<Game>();

    public virtual ICollection<Game> GameWinners { get; set; } = new List<Game>();

    public virtual ICollection<BugReport> BugReports { get; set; } = new List<BugReport>();

    public virtual UserColor? UserColor { get; set; }
}
