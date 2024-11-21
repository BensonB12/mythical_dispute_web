using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Artist
{
    public int Id { get; set; }

    public string ArtistName { get; set; } = null!;

    public virtual ICollection<Card> Cards { get; set; } = new List<Card>();
}
