using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Size
{
    public int Id { get; set; }

    public string SizeDisplay { get; set; } = null!;

    public virtual ICollection<Card> Cards { get; set; } = new List<Card>();
}
