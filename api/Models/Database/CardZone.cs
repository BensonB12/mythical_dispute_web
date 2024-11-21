using System;
using System.Collections.Generic;

namespace api.Models;

public partial class CardZone
{
    public int Id { get; set; }

    public string? CardZoneValue { get; set; }

    public int? PlayerIdsHand { get; set; }

    public virtual ICollection<GameCard> GameCards { get; set; } = new List<GameCard>();

    public virtual MdUser? PlayerIdsHandNavigation { get; set; }
}
